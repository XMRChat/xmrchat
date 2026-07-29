import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  LinkPlatformEnum,
  LiveStreamPlatformEnum,
  PageStatusEnum,
} from 'src/shared/constants';
import { And, IsNull, Not, Repository } from 'typeorm';
import { YoutubeProvider } from './providers/youtube.provider';
import { CreateLiveStreamDto } from './dtos/create-live-stream.dto';
import { LiveStream } from './live-stream.entity';
import { LinksService } from 'src/links/links.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { ConfigService } from '@nestjs/config';
import { TwitchProvider } from './providers/twitch.provider';
import { Page } from 'src/pages/page.entity';
import { RumbleProvider } from './providers/rumble.provider';
import { Link } from 'src/links/link.entity';
import { Tip } from 'src/tips/tip.entity';
import { PeertubeProvider } from './providers/peertube.provider';
import { KickProvider } from './providers/kick.provider';

@Injectable()
export class LiveStreamsService implements OnModuleInit {
  private logger = new Logger(LiveStreamsService.name);

  constructor(
    private linksService: LinksService,
    private youtubeProvider: YoutubeProvider,
    private twitchProvider: TwitchProvider,
    private kickProvider: KickProvider,
    private rumbleProvider: RumbleProvider,
    private peertubeProvider: PeertubeProvider,
    private config: ConfigService,
    @InjectRepository(LiveStream) private repo: Repository<LiveStream>,
    @InjectRepository(Page) private pagesRepo: Repository<Page>,
    @InjectRepository(Link) private linkRepo: Repository<Link>,
    @InjectQueue('live-stream') private liveStreamQueue: Queue,
  ) {}

  onModuleInit() {
    const interval = this.config.get('LIVE_STREAM_INTERVAL') || 5;
    this.liveStreamQueue.upsertJobScheduler('streams', {
      // every 5 minutes
      pattern: `*/${interval} * * * *`,
    });
  }

  async findAll() {
    const streams = await this.repo
      .createQueryBuilder('liveStream')
      .leftJoinAndSelect('liveStream.page', 'page')
      .leftJoinAndSelect('page.logo', 'logo')
      .distinctOn(['page.id'])
      .orderBy('page.id', 'ASC')
      .addOrderBy('liveStream.startedAt', 'DESC', 'NULLS LAST')
      .addOrderBy(
        `CASE 
          WHEN liveStream.platform = '${LiveStreamPlatformEnum.TWITCH}' THEN 1
          WHEN liveStream.platform = '${LiveStreamPlatformEnum.KICK}' THEN 2
          WHEN liveStream.platform = '${LiveStreamPlatformEnum.PEERTUBE}' THEN 3
          WHEN liveStream.platform = '${LiveStreamPlatformEnum.YOUTUBE}' THEN 4
          WHEN liveStream.platform = '${LiveStreamPlatformEnum.RUMBLE}' THEN 5
          ELSE 6
        END`,
        'ASC',
      )
      .getMany();

    return streams.sort((a, b) => {
      return (b.startedAt?.getTime() || 0) - (a.startedAt?.getTime() || 0);
    });
  }

  async updateLiveStreams(dto: CreateLiveStreamDto[]) {
    await this.repo.manager.transaction(async (manager) => {
      // Delete all existing streams
      await manager.delete(LiveStream, {});

      if (!dto.length) return;
      const created = dto.map((stream) => {
        return this.repo.create({
          platform: stream.platform,
          title: stream.title,
          description: stream.description,
          imageUrl: stream.imageUrl,
          channelId: stream.channelId,
          channelName: stream.channelName,
          videoId: stream.videoId,
          viewerCount: stream.viewerCount,
          startedAt: stream.startedAt ? new Date(stream.startedAt) : null,
          data: stream.data,
          page: { id: stream.pageId },
        });
      });

      await manager.save(LiveStream, created);
    });
  }

  async getAndUpdateLiveStreams() {
    const youtube = await this.getYoutubeLiveStreams();
    const twitch = await this.getTwitchLiveStreams();
    const kick = await this.getKickLiveStreams();
    const rumble = await this.getRumbleLiveStreams();
    const peertube = await this.getPeertubeLiveStreams();

    await this.updateLiveStreams([
      ...youtube,
      ...twitch,
      ...kick,
      ...rumble,
      ...peertube,
    ]);
    const result = await this.findAll();
    return result;
  }

  async getTwitchProviderParams() {
    const links = await this.linksService.findByPlatform(
      LinkPlatformEnum.TWITCH,
    );

    const linkParams = links.map((link) => ({
      username: link.value,
      pageId: link.page.id,
    }));

    const pages = await this.pagesRepo.find({
      where: {
        twitchChannel: And(Not(IsNull()), Not('')),
        isPublic: true,
        status: Not(PageStatusEnum.DEACTIVE),
      },
    });

    const pageParams = pages.map((page) => ({
      username: page.twitchChannel,
      pageId: page.id,
    }));

    const linkPageIds = new Set(linkParams.map((param) => param.pageId));
    const uniquePageParams = pageParams.filter(
      (param) => !linkPageIds.has(param.pageId),
    );

    const params = [...linkParams, ...uniquePageParams];
    return params;
  }

  async getTwitchLiveStreams() {
    const params = await this.getTwitchProviderParams();
    return this.twitchProvider.getLiveStreams(params);
  }

  async getKickLiveStreams() {
    const links = await this.linksService.findByPlatform(LinkPlatformEnum.KICK);

    const params = links.map((link) => ({
      username: link.value,
      pageId: link.page.id,
    }));

    const streams = await this.kickProvider.getLiveStreams(params);

    return streams;
  }

  async getYoutubeLiveStreams() {
    const query = this.linkRepo
      .createQueryBuilder('link')
      .leftJoinAndSelect('link.page', 'page')
      .where('link.platform = :platform', {
        platform: LiveStreamPlatformEnum.YOUTUBE,
      })
      .andWhere('link.value IS NOT NULL')
      .andWhere(`link.value <> ''`)
      .andWhere(
        (qb) => {
          const subQuery = qb
            .subQuery()
            .select('COALESCE(SUM(payment.amount::BIGINT / 1e12), 0)')
            .from(Tip, 'tip')
            .leftJoin('tip.payment', 'payment')
            .where('tip.page_id = page.id')
            .andWhere('payment.paid_at IS NOT NULL')
            .getQuery();
          return `(${subQuery}) >= :minAmount`;
        },
        { minAmount: 0.025 },
      );

    const links = await query.getMany();

    const allLinks = await this.linksService.findByPlatform(
      LinkPlatformEnum.YOUTUBE,
    );

    const params = links.map((link) => ({
      username: link.value,
      pageId: link.page.id,
    }));

    const twitchParams = await this.getTwitchProviderParams();

    // don't add pages that are already in twitch params
    const uniqueParams = params.filter(
      (param) =>
        !twitchParams.some(
          (twitchParam) => twitchParam.pageId === param.pageId,
        ),
    );

    return this.youtubeProvider.getLiveStreams(uniqueParams);
  }

  async getRumbleLiveStreams() {
    const links = await this.linksService.findByPlatform(
      LinkPlatformEnum.RUMBLE,
    );
    const linksWithData = links.filter((link) =>
      Boolean(link.data?.rumbleLiveStreamUrl),
    );

    const params = linksWithData.map((link) => ({
      url: link.data?.rumbleLiveStreamUrl,
      pageId: link.page.id,
    }));

    return this.rumbleProvider.getLiveStreams(params);
  }

  async getPeertubeLiveStreams() {
    return this.peertubeProvider.getLiveStreams();
  }
}
