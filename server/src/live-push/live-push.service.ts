import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectQueue } from '@nestjs/bullmq';
import { Interval } from '@nestjs/schedule';
import { Queue, UnrecoverableError } from 'bullmq';
import { createHash, randomUUID, timingSafeEqual } from 'node:crypto';
import { request } from 'node:https';
import { EntityManager, In, MoreThan, Repository } from 'typeorm';
import * as webpush from 'web-push';
import { Page } from 'src/pages/page.entity';
import { PageStatusEnum } from 'src/shared/constants';
import { CreateLiveStreamDto } from 'src/live-streams/dtos/create-live-stream.dto';
import { PushSubscription } from './push-subscription.entity';
import { LivePushState } from './live-push-state.entity';
import { LivePushEvent, LivePushMessage } from './live-push-event.entity';
import { PushRegistrationDto } from './dtos/push-registration.dto';
import { resolvePushEndpoint } from './push-endpoint';
import { isNewSession, streamIdentities } from './live-session';

const PUSH_FANOUT_PAGE = 250;

export type LivePushJob = {
  id: string;
  endpoint: string;
  message: LivePushMessage;
  expiresAt: number;
};

@Injectable()
export class LivePushService {
  private readonly logger = new Logger(LivePushService.name);

  constructor(
    private readonly config: ConfigService,
    @InjectRepository(PushSubscription)
    private readonly subscriptions: Repository<PushSubscription>,
    @InjectRepository(LivePushEvent)
    private readonly events: Repository<LivePushEvent>,
    @InjectQueue('xmrpod-push') private readonly queue: Queue,
  ) {}

  enabled() {
    return Boolean(
      this.config.get('XMRPOD_PUSH_VAPID_PUBLIC_KEY') &&
        this.config.get('XMRPOD_PUSH_VAPID_PRIVATE_KEY'),
    );
  }

  publicKey() {
    if (!this.enabled()) {
      throw new ServiceUnavailableException('Live push is not configured');
    }
    return {
      publicKey: this.config.get<string>('XMRPOD_PUSH_VAPID_PUBLIC_KEY'),
    };
  }

  private tokenHash(token: string) {
    if (!/^[a-f0-9]{64}$/.test(token || '')) throw new UnauthorizedException();
    return createHash('sha256').update(token).digest('hex');
  }

  async authorize(id: string, token: string) {
    const hash = this.tokenHash(token);
    const subscription = await this.subscriptions.findOneBy({ id });
    if (
      !subscription ||
      !timingSafeEqual(Buffer.from(hash), Buffer.from(subscription.tokenHash))
    ) {
      throw new UnauthorizedException();
    }
    return subscription;
  }

  async register(id: string, token: string, dto: PushRegistrationDto) {
    this.publicKey();
    const tokenHash = this.tokenHash(token);
    await resolvePushEndpoint(dto.endpoint);
    if (
      Buffer.from(dto.p256dh, 'base64url').length !== 65 ||
      Buffer.from(dto.auth, 'base64url').length !== 16
    ) {
      throw new BadRequestException('Invalid push keys');
    }
    const existing = await this.subscriptions.findOneBy({ id });
    if (existing) await this.authorize(id, token);
    const unchanged =
      existing?.endpoint === dto.endpoint &&
      existing.p256dh === dto.p256dh &&
      existing.auth === dto.auth;
    const challenge = unchanged && existing.verifiedAt ? null : randomUUID();
    const subscription = await this.subscriptions.save({
      id,
      tokenHash,
      ...dto,
      challenge,
      verifiedAt: unchanged ? existing.verifiedAt : null,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60_000),
    });
    if (challenge)
      await this.enqueue(
        subscription,
        { type: 'verify', nonce: challenge },
        challenge,
        Date.now() + 5 * 60_000,
      );
    return { registered: true, verified: Boolean(subscription.verifiedAt) };
  }

  async acknowledge(id: string, token: string, nonce: string) {
    const subscription = await this.authorize(id, token);
    if (!subscription.challenge && subscription.verifiedAt)
      return { verified: true };
    if (!subscription.challenge || subscription.challenge !== nonce)
      throw new ConflictException('Challenge was superseded');
    await this.subscriptions.update(id, {
      challenge: null,
      verifiedAt: new Date(),
    });
    return { verified: true };
  }

  async test(id: string, token: string) {
    const subscription = await this.authorize(id, token);
    const nonce = randomUUID();
    await this.subscriptions.update(id, { challenge: nonce });
    await this.enqueue(
      subscription,
      { type: 'test', nonce },
      nonce,
      Date.now() + 5 * 60_000,
    );
    return { queued: true };
  }

  async unregister(id: string, token: string) {
    await this.authorize(id, token);
    await this.subscriptions.delete(id);
    return { removed: true };
  }

  private job(
    subscription: PushSubscription,
    message: LivePushMessage,
    eventId: string,
    expiresAt: number,
  ) {
    return {
      name: 'send',
      data: {
        id: subscription.id,
        endpoint: subscription.endpoint,
        message,
        expiresAt,
      } as LivePushJob,
      opts: {
        jobId: `${eventId}-${subscription.id}`,
        // 5 retries: 5 + 10 + 20 + 40 + 80 s, within the 5 minute expiry.
        attempts: 6,
        backoff: { type: 'exponential', delay: 5000 },
        removeOnComplete: { age: 24 * 60 * 60 },
        removeOnFail: { age: 24 * 60 * 60 },
      },
    };
  }

  private async enqueue(
    subscription: PushSubscription,
    message: LivePushMessage,
    eventId: string,
    expiresAt: number,
  ) {
    const { name, data, opts } = this.job(
      subscription,
      message,
      eventId,
      expiresAt,
    );
    await this.queue.add(name, data, opts);
  }

  /**
   * Tracks one notification session per page and returns the streams with
   * notificationSessionId and notificationStartedAt in their data. Sessions are
   * always tracked; live events are written to the outbox only when VAPID keys
   * are configured. Run it inside its own savepoint: it may throw.
   */
  async updateSnapshot(manager: EntityManager, streams: CreateLiveStreamDto[]) {
    const sending = this.enabled();
    await manager.query('SELECT pg_advisory_xact_lock(17920346)');
    const states = manager.getRepository(LivePushState);
    const now = new Date();
    const initialized = await states.existsBy({ pageId: 0 });
    if (!initialized)
      await states.save({
        pageId: 0,
        sessionId: randomUUID(),
        identities: {},
        startedAt: now,
        lastSeenAt: now,
      });
    const pageIds = [
      ...new Set(
        streams
          .map((stream) => stream.pageId)
          .filter((pageId) => pageId !== undefined && pageId !== null),
      ),
    ];
    const pages = pageIds.length
      ? await manager.findBy(Page, { id: In(pageIds) })
      : [];
    const known = new Set(pages.map((page) => page.id));
    const result: CreateLiveStreamDto[] = streams.filter(
      (stream) => !known.has(stream.pageId),
    );
    for (const page of pages) {
      const current = streams.filter((stream) => stream.pageId === page.id);
      const identities = streamIdentities(current);
      let state = await states.findOneBy({ pageId: page.id });
      const fresh = isNewSession(state, identities, now);
      if (fresh) {
        const starts = current
          .map((stream) => new Date(stream.startedAt || now).getTime())
          .filter((time) => Number.isFinite(time) && time <= now.getTime());
        state = states.create({
          pageId: page.id,
          sessionId: randomUUID(),
          startedAt: new Date(Math.min(now.getTime(), ...starts)),
          identities,
          lastSeenAt: now,
        });
        if (
          sending &&
          initialized &&
          page.isPublic &&
          page.status !== PageStatusEnum.DEACTIVE
        ) {
          await manager.save(LivePushEvent, {
            id: state.sessionId,
            dispatched: false,
            expiresAt: new Date(now.getTime() + 5 * 60_000),
            message: {
              type: 'live',
              sessionId: state.sessionId,
              path: page.path,
              startedAt: state.startedAt.toISOString(),
              detectedAt: now.toISOString(),
            },
          });
        }
      } else {
        state.identities = { ...state.identities, ...identities };
        state.lastSeenAt = now;
      }
      await states.save(state);
      result.push(
        ...current.map((stream) => ({
          ...stream,
          data: {
            ...stream.data,
            notificationSessionId: state.sessionId,
            notificationStartedAt: state.startedAt.toISOString(),
          },
        })),
      );
    }
    return result;
  }

  @Interval(30_000)
  async dispatch() {
    if (!this.enabled()) return;
    await this.events.manager.transaction(async (manager) => {
      const pending = await manager
        .getRepository(LivePushEvent)
        .createQueryBuilder('event')
        .where('event.dispatched = false')
        .andWhere('event.expiresAt > :now', { now: new Date() })
        .setLock('pessimistic_write')
        .setOnLocked('skip_locked')
        .take(20)
        .getMany();
      for (const event of pending) {
        let offset = 0;
        while (true) {
          const subscriptions = await this.subscriptions.find({
            where: {
              verifiedAt: MoreThan(new Date(0)),
              expiresAt: MoreThan(new Date()),
            },
            order: { id: 'ASC' },
            skip: offset,
            take: PUSH_FANOUT_PAGE,
          });
          if (subscriptions.length)
            await this.queue.addBulk(
              subscriptions.map((subscription) =>
                this.job(
                  subscription,
                  event.message,
                  event.id,
                  event.expiresAt.getTime(),
                ),
              ),
            );
          if (subscriptions.length < PUSH_FANOUT_PAGE) break;
          offset += subscriptions.length;
        }
        await manager.update(LivePushEvent, event.id, { dispatched: true });
      }
    });
    await this.events
      .createQueryBuilder()
      .delete()
      .where('expires_at < :cutoff', {
        cutoff: new Date(Date.now() - 24 * 60 * 60_000),
      })
      .execute();
    await this.subscriptions
      .createQueryBuilder()
      .delete()
      .where('expires_at < :now', { now: new Date() })
      .execute();
  }

  async send(job: LivePushJob) {
    if (job.expiresAt < Date.now()) return;
    const subscription = await this.subscriptions.findOneBy({
      id: job.id,
      endpoint: job.endpoint,
      expiresAt: MoreThan(new Date()),
    });
    if (
      !subscription ||
      (job.message.type === 'live' && !subscription.verifiedAt)
    )
      return;
    const { url, address, family } = await resolvePushEndpoint(
      subscription.endpoint,
    );
    const details = webpush.generateRequestDetails(
      {
        endpoint: subscription.endpoint,
        keys: { p256dh: subscription.p256dh, auth: subscription.auth },
      },
      JSON.stringify(job.message),
      {
        TTL: Math.max(0, Math.floor((job.expiresAt - Date.now()) / 1000)),
        contentEncoding: 'aes128gcm',
        urgency: job.message.type === 'verify' ? 'normal' : 'high',
        vapidDetails: {
          subject:
            this.config.get('XMRPOD_PUSH_VAPID_SUBJECT') ||
            'https://xmrchat.com',
          publicKey: this.publicKey().publicKey,
          privateKey: this.config.get('XMRPOD_PUSH_VAPID_PRIVATE_KEY'),
        },
      },
    );
    const status = await new Promise<number>((resolve, reject) => {
      const req = request(
        url,
        {
          method: details.method,
          headers: details.headers,
          family,
          lookup: (_host, _options, callback) =>
            callback(null, address, family),
        },
        (response) => {
          response.resume();
          response.on('end', () => resolve(response.statusCode || 500));
          response.on('error', reject);
        },
      );
      req.setTimeout(10_000, () =>
        req.destroy(new Error('Push request timed out')),
      );
      req.on('error', reject);
      req.end(details.body);
    });
    if (status === 404 || status === 410) {
      // The push service says this endpoint is gone for good.
      await this.subscriptions.delete(subscription.id);
    } else if ([400, 401, 403, 413].includes(status)) {
      // Our request was rejected (for example a VAPID key mistake). Keep the
      // registration, log it and fail without retrying.
      this.logger.error(
        `Push delivery of ${job.message.type} was rejected with ${status}`,
      );
      throw new UnrecoverableError(`Push delivery returned ${status}`);
    } else if (status < 200 || status >= 300) {
      throw new Error(`Push delivery returned ${status}`);
    }
  }
}
