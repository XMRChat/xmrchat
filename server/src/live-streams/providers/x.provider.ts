import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type {
  APIRequestContext,
  BrowserContext,
  Page,
  Response,
} from 'playwright';
import { chromium, request } from 'playwright';
import { LiveStreamPlatformEnum } from 'src/shared/constants';
import { getErrorMessage } from 'src/shared/utils/errors';
import { CreateLiveStreamDto } from '../dtos/create-live-stream.dto';
import {
  LiveStreamProvider,
  LiveStreamProviderParams,
} from './live-stream-provider.interface';

type XProviderParam = LiveStreamProviderParams & { username: string };
type XLiveLink = { url: string; title?: string };
type XRecord = Record<string, any>;

@Injectable()
export class XProvider implements LiveStreamProvider, OnModuleDestroy {
  private readonly logger = new Logger(XProvider.name);
  private context?: BrowserContext;
  private requestContext?: APIRequestContext;

  constructor(private readonly config: ConfigService) {}

  async onModuleDestroy() {
    await this.context?.close().catch(() => undefined);
    await this.requestContext?.dispose().catch(() => undefined);
  }

  async getLiveStreams(
    params: LiveStreamProviderParams[],
  ): Promise<CreateLiveStreamDto[]> {
    if (!this.isEnabled()) return [];

    const streams: CreateLiveStreamDto[] = [];
    // Check one profile at a time to limit load on X.
    for (const param of params) {
      if (!param.username || !/^[a-zA-Z0-9_]{1,15}$/.test(param.username)) {
        this.logger.warn(
          `X live detection skipped invalid username "${param.username ?? ''}" for page ${param.pageId}`,
        );
        continue;
      }
      const stream = await this.getLiveStream(param as XProviderParam);
      if (stream) streams.push(stream);
    }
    return streams;
  }

  private async getLiveStream(
    param: XProviderParam,
  ): Promise<CreateLiveStreamDto | undefined> {
    let page: Page | undefined;
    try {
      const profileUrl = `https://x.com/${param.username}`;
      let liveLink = await this.findLiveLinkByRequest(
        profileUrl,
        param.username,
      );
      if (!liveLink) {
        this.logger.log(`X @${param.username}: HTTP missed, trying browser`);
        const context = await this.getContext();
        page = await context.newPage();
        const pending = new Set<Promise<void>>();
        const onResponse = (response: Response) => {
          const url = new URL(response.url());
          if (
            !response.ok() ||
            !['x.com', 'api.x.com', 'twitter.com', 'api.twitter.com'].includes(
              url.hostname,
            ) ||
            !/json|html/.test(response.headers()['content-type'] || '')
          )
            return;
          const read = response
            .text()
            .then((body) => {
              liveLink ||= this.findLiveLinkInResponse(body, param.username);
            })
            .catch(() => undefined);
          pending.add(read);
          void read.finally(() => pending.delete(read));
        };
        page.on('response', onResponse);
        await page.goto(profileUrl, {
          waitUntil: 'domcontentloaded',
          timeout: 15000,
        });
        await page.waitForTimeout(2500);
        page.off('response', onResponse);
        // Bound response-body reads too, so a stalled response cannot block refresh.
        let timer: ReturnType<typeof setTimeout>;
        try {
          await Promise.race([
            Promise.all(pending),
            new Promise<void>((resolve) => {
              timer = setTimeout(resolve, 2500);
            }),
          ]);
        } finally {
          clearTimeout(timer);
        }
        this.logger.log(
          `X @${param.username}: browser ${page.url()}${liveLink ? `, live ${liveLink.url}` : ', no live link'}`,
        );
      }
      if (!liveLink) return;
      return {
        pageId: param.pageId,
        title: liveLink.title || `${param.username} is live on X`,
        description: 'Live on X',
        channelName: param.username,
        channelId: param.username,
        videoId: liveLink.url,
        platform: LiveStreamPlatformEnum.X,
        startedAt: new Date().toISOString(),
        data: { url: liveLink.url, profileUrl },
      };
    } catch (error) {
      this.logger.warn(
        `Failed to check X live status for ${param.username}: ${getErrorMessage(error)}`,
      );
    } finally {
      await page?.close().catch(() => undefined);
    }
  }

  private async findLiveLinkByRequest(profileUrl: string, username: string) {
    try {
      this.requestContext ||= await request.newContext({
        userAgent:
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36',
      });
      const response = await this.requestContext.get(profileUrl, {
        timeout: 15000,
      });
      try {
        if (!response.ok()) {
          this.logger.warn(
            `X profile request returned ${response.status()} for ${username} (${response.url()})`,
          );
          return;
        }
        const body = await response.text();
        const liveLink = this.findLiveLinkInResponse(body, username);
        this.logger.log(
          `X @${username}: HTTP ${response.status()} ${response.url()} (${body.length} bytes)${liveLink ? `, live ${liveLink.url}` : ', no live link'}`,
        );
        return liveLink;
      } finally {
        await response.dispose();
      }
    } catch (error) {
      this.logger.warn(
        `X profile request failed for ${username}: ${getErrorMessage(error)}`,
      );
    }
  }

  private findLiveLinkInResponse(
    body: string,
    username: string,
  ): XLiveLink | undefined {
    // JSON API responses contain nested records; SSR responses use Relay references.
    let data: unknown;
    try {
      data = JSON.parse(body);
    } catch {
      return this.findLiveLinkInRelayResponse(body, username);
    }
    const visit = (value: unknown): XLiveLink | undefined => {
      if (!value || typeof value !== 'object') return;
      const record = value as XRecord;
      const liveLink = this.liveLinkFromRecord(record, username);
      if (liveLink) return liveLink;
      for (const child of Object.values(record)) {
        const result = visit(child);
        if (result) return result;
      }
    };
    return visit(data);
  }

  private findLiveLinkInRelayResponse(body: string, username: string) {
    const records = new Map<string, XRecord>();
    // Read scalar fields and Relay references from X's serialized response data.
    // Never execute the scripts received from X or infer live status from link text.
    for (const script of body.matchAll(
      /<script\b[^>]*>([\s\S]*?)<\/script>/gi,
    )) {
      for (const match of script[1].matchAll(
        /\{__id:("(?:\\.|[^"\\])*"),__typename:("(?:\\.|[^"\\])*")([\s\S]*?)(?=\{__id:|$)/g,
      )) {
        const record: XRecord = { __typename: JSON.parse(match[2]) };
        for (const field of match[3].matchAll(
          /[,{}](\w+):("(?:\\.|[^"\\])*"|null|\d+|\$R\[\d+\]=\{__ref:("(?:\\.|[^"\\])*")\})/g,
        )) {
          record[field[1]] = field[3]
            ? { __ref: JSON.parse(field[3]) }
            : JSON.parse(field[2]);
        }
        records.set(JSON.parse(match[1]), record);
      }
    }
    const resolve = (value: XRecord | undefined): XRecord | undefined =>
      value?.__ref ? records.get(value.__ref) : value;
    for (const record of records.values()) {
      const liveLink = this.liveLinkFromRecord(record, username, resolve);
      if (liveLink) return liveLink;
    }
  }

  private liveLinkFromRecord(
    record: XRecord,
    username: string,
    resolve: (value: XRecord | undefined) => XRecord | undefined = (value) =>
      value,
  ): XLiveLink | undefined {
    const metadata = resolve(record.metadata) || record;
    if (metadata.state !== 'Running') return;
    const isBroadcast =
      record.__typename === 'Broadcast' || Boolean(record.broadcast_id);
    const isSpace = record.__typename === 'AudioSpace';
    if (!isBroadcast && !isSpace) return;

    const userResults = resolve(
      metadata.user_results || metadata.creator_results,
    );
    const user = resolve(userResults?.result);
    const core = resolve(user?.core);
    const legacy = resolve(user?.legacy);
    const periscopeUser = resolve(record.periscope_user);
    const owner =
      core?.screen_name || legacy?.screen_name || periscopeUser?.username;
    if (
      typeof owner !== 'string' ||
      owner.toLowerCase() !== username.toLowerCase()
    )
      return;

    const id = isBroadcast ? record.broadcast_id : record.rest_id;
    if (typeof id !== 'string' || !/^[a-zA-Z0-9]+$/.test(id)) return;
    const title = isBroadcast ? record.status : metadata.title;
    return {
      url: `https://x.com/i/${isBroadcast ? 'broadcasts' : 'spaces'}/${id}`,
      title: typeof title === 'string' ? title.slice(0, 240) : undefined,
    };
  }

  private async getContext() {
    if (this.context) return this.context;
    this.context = await chromium.launchPersistentContext(
      '.cache/x-live-browser',
      {
        headless: true,
        chromiumSandbox: false,
        args: ['--no-sandbox', '--disable-dev-shm-usage'],
      },
    );
    return this.context;
  }

  isEnabled() {
    const value = this.config.get<string | boolean>('X_LIVE_CHECK_ENABLED');
    if (typeof value === 'boolean') return value;
    return (
      typeof value === 'string' &&
      ['true', '1', 'yes', 'on'].includes(value.toLowerCase())
    );
  }
}
