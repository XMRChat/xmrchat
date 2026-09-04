import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { load } from 'cheerio';
import type { BrowserContext, Page } from 'playwright';
import { chromium } from 'playwright';
import { LiveStreamPlatformEnum } from 'src/shared/constants';
import { getErrorMessage } from 'src/shared/utils/errors';
import { CreateLiveStreamDto } from '../dtos/create-live-stream.dto';
import {
  LiveStreamProvider,
  LiveStreamProviderParams,
} from './live-stream-provider.interface';

type XProviderParam = LiveStreamProviderParams & { username: string };

type XLiveLink = {
  url: string;
  title?: string;
};

@Injectable()
export class XProvider implements LiveStreamProvider, OnModuleDestroy {
  private readonly logger = new Logger(XProvider.name);
  private context?: BrowserContext;

  constructor(private readonly config: ConfigService) {}

  async onModuleDestroy() {
    await this.context?.close().catch(() => undefined);
  }

  async getLiveStreams(
    params: LiveStreamProviderParams[],
  ): Promise<CreateLiveStreamDto[]> {
    if (!this.isEnabled()) return [];
    if (!params.length) return [];

    const pageParams = params.filter(
      (param): param is XProviderParam => Boolean(param.username),
    );

    if (!pageParams.length) return [];

    const streams: CreateLiveStreamDto[] = [];
    const concurrency = this.getNumberConfig('X_LIVE_CHECK_CONCURRENCY', 1);

    for (let index = 0; index < pageParams.length; index += concurrency) {
      const chunk = pageParams.slice(index, index + concurrency);
      const results = await Promise.all(
        chunk.map((param) => this.getLiveStream(param)),
      );
      streams.push(...results.filter((stream) => Boolean(stream)));
    }

    return streams;
  }

  private async getLiveStream(
    param: XProviderParam,
  ): Promise<CreateLiveStreamDto | undefined> {
    let page: Page | undefined;

    try {
      const profileUrl = `https://x.com/${param.username}`;
      const requestLiveLink = await this.findLiveLinkByRequest(profileUrl);
      if (requestLiveLink) {
        return this.createLiveStream(param, profileUrl, requestLiveLink);
      }

      const context = await this.getContext();
      page = await context.newPage();

      await page.goto(profileUrl, {
        waitUntil: 'domcontentloaded',
        timeout: this.getNumberConfig('X_LIVE_CHECK_TIMEOUT_MS', 15000),
      });

      await page.waitForTimeout(
        this.getNumberConfig('X_LIVE_CHECK_PAGE_SETTLE_MS', 2500),
      );

      const blockedReason = await this.getBlockedReason(page);
      if (blockedReason) {
        this.logger.warn(
          `Skipping X live check for ${param.username}: ${blockedReason}`,
        );
        return;
      }

      const liveLink = await this.findLiveLink(page);
      if (!liveLink) return;

      return this.createLiveStream(param, profileUrl, liveLink);
    } catch (error) {
      this.logger.warn(
        `Failed to check X live status for ${param.username}: ${getErrorMessage(error)}`,
      );
    } finally {
      await page?.close().catch(() => undefined);
    }
  }

  private async findLiveLinkByRequest(
    profileUrl: string,
  ): Promise<XLiveLink | undefined> {
    try {
      const response = await axios.get<string>(profileUrl, {
        headers: {
          Accept: 'text/html,application/xhtml+xml',
          'User-Agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36',
        },
        timeout: this.getNumberConfig('X_LIVE_CHECK_TIMEOUT_MS', 15000),
      });
      const $ = load(response.data);
      const livePattern = /\b(live|listen live|watch live|join live)\b/i;
      let fallback: XLiveLink | undefined;

      for (const anchor of $('a[href*="/i/spaces/"], a[href*="/broadcasts/"]')) {
        const element = $(anchor);
        const href = element.attr('href');
        if (!href) continue;

        const ariaLabel = element.attr('aria-label') || '';
        const text = [
          element.text(),
          ariaLabel,
          element.parent().text(),
        ]
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim();
        const isRunning = /state:\\?"Running\\?"/.test(text);
        if (!isRunning && !livePattern.test(text)) continue;

        const liveLink = {
          url: href.startsWith('http') ? href : `https://x.com${href}`,
        };
        const title = ariaLabel
          .replace(/^Open (broadcast|space):\s*/i, '')
          .trim();
        if (title) return { ...liveLink, title: title.slice(0, 240) };
        fallback = liveLink;
      }

      return fallback;
    } catch (error) {
      this.logger.warn(
        `X profile request failed for ${profileUrl}: ${getErrorMessage(error)}`,
      );
    }
  }

  private createLiveStream(
    param: XProviderParam,
    profileUrl: string,
    liveLink: XLiveLink,
  ): CreateLiveStreamDto {
    return {
      pageId: param.pageId,
      title: liveLink.title || `${param.username} is live on X`,
      description: 'Live on X',
      channelName: param.username,
      channelId: param.username,
      videoId: liveLink.url,
      platform: LiveStreamPlatformEnum.X,
      startedAt: new Date().toISOString(),
      data: {
        url: liveLink.url,
        profileUrl,
      },
    };
  }

  private async getContext() {
    if (this.context) return this.context;

    this.context = await chromium.launchPersistentContext(
      this.config.get('X_LIVE_BROWSER_PROFILE_DIR') || '.cache/x-live-browser',
      {
        headless: this.getBooleanConfig('X_LIVE_BROWSER_HEADLESS', true),
        chromiumSandbox: false,
        args: ['--no-sandbox', '--disable-dev-shm-usage'],
      },
    );

    return this.context;
  }

  private async getBlockedReason(page: Page) {
    return page.evaluate(() => {
      const bodyText = document.body?.innerText || '';
      const lower = bodyText.toLowerCase();

      if (lower.includes('captcha')) return 'captcha challenge detected';
      if (lower.includes('unusual login activity')) {
        return 'login challenge detected';
      }
      if (lower.includes('something went wrong. try reloading')) {
        return 'X returned a generic loading error';
      }
      if (lower.includes('sign in to x') || lower.includes('log in to x')) {
        return 'login wall detected';
      }
    });
  }

  private async findLiveLink(page: Page): Promise<XLiveLink | undefined> {
    return page.evaluate(() => {
      const livePattern = /\b(live|listen live|watch live|join live)\b/i;
      const anchors = Array.from(
        document.querySelectorAll<HTMLAnchorElement>(
          'a[href*="/i/spaces/"], a[href*="/broadcasts/"]',
        ),
      );

      for (const anchor of anchors) {
        let node: Element | null = anchor;
        const ariaLabel = anchor.getAttribute('aria-label') || '';
        const textParts = [
          anchor.innerText || anchor.textContent || '',
          ariaLabel,
        ];

        for (let depth = 0; depth < 4 && node?.parentElement; depth += 1) {
          node = node.parentElement;
          textParts.push(
            node.textContent || '',
            node.getAttribute('aria-label') || '',
          );
        }

        const text = textParts.join(' ').replace(/\s+/g, ' ').trim();
        if (!text.includes('LIVE') && !livePattern.test(text)) continue;

        const href = anchor.href || anchor.getAttribute('href');
        if (!href) continue;

        return {
          url: href.startsWith('http') ? href : `https://x.com${href}`,
          title: (ariaLabel.replace(/^Open (broadcast|space):\s*/i, '') || text)
            .replace(/\s+/g, ' ')
            .trim()
            .slice(0, 240),
        };
      }
    });
  }

  isEnabled() {
    return this.getBooleanConfig('X_LIVE_CHECK_ENABLED', false);
  }

  private getBooleanConfig(key: string, defaultValue: boolean) {
    const value = this.config.get<string | boolean>(key);
    if (value === undefined || value === null || value === '') {
      return defaultValue;
    }
    if (typeof value === 'boolean') return value;
    return ['true', '1', 'yes', 'on'].includes(value.toLowerCase());
  }

  private getNumberConfig(key: string, defaultValue: number) {
    const value = Number(this.config.get(key));
    return Number.isFinite(value) && value >= 0 ? value : defaultValue;
  }
}
