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
      if (!param.username || !/^[a-zA-Z0-9_]{1,15}$/.test(param.username))
        continue;
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
            `X profile request returned ${response.status()} for ${username}`,
          );
          return;
        }
        return this.findLiveLinkInResponse(await response.text(), username);
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
    // Read broadcast and Space fields from the page text. Never execute scripts from X.
    const broadcast = this.findRunningBroadcast(body, username);
    if (broadcast) return broadcast;
    return this.findRunningSpace(body, username);
  }

  private findRunningBroadcast(
    body: string,
    username: string,
  ): XLiveLink | undefined {
    for (const match of body.matchAll(/broadcast_id:"([a-zA-Z0-9]+)"/g)) {
      const chunk = this.chunkAfter(body, match.index + match[0].length, 'broadcast_id:"');
      const owner = chunk.match(/username:"([a-zA-Z0-9_]+)"/)?.[1];
      if (!chunk.includes('state:"Running"')) continue;
      if (owner?.toLowerCase() !== username.toLowerCase()) continue;
      const title = chunk.match(/status:"((?:\\.|[^"\\])*)"/)?.[1];
      return {
        url: `https://x.com/i/broadcasts/${match[1]}`,
        title: title?.slice(0, 240),
      };
    }
  }

  private findRunningSpace(
    body: string,
    username: string,
  ): XLiveLink | undefined {
    const marker = 'audio_space_by_rest_id:';
    let from = 0;
    while (from < body.length) {
      const at = body.indexOf(marker, from);
      if (at < 0) return;
      const start = at + marker.length;
      const chunk = this.chunkAfter(body, start, marker);
      from = start;
      if (!chunk.includes('state:"Running"')) continue;
      const owner = chunk.match(
        /(?:screen_name|username):"([a-zA-Z0-9_]+)"/,
      )?.[1];
      if (owner?.toLowerCase() !== username.toLowerCase()) continue;
      const id = chunk.match(
        /state:"Running"[\s\S]{0,2000}?rest_id:"([a-zA-Z0-9]+)"/,
      )?.[1];
      if (!id) continue;
      const title = chunk.match(
        /state:"Running",title:"((?:\\.|[^"\\])*)"/,
      )?.[1];
      return {
        url: `https://x.com/i/spaces/${id}`,
        title: title?.slice(0, 240),
      };
    }
  }

  private chunkAfter(body: string, start: number, marker: string) {
    const next = body.indexOf(marker, start);
    return body.slice(
      start,
      Math.min(next === -1 ? body.length : next, start + 12000),
    );
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
