import { Injectable, Logger } from '@nestjs/common';
import {
  KickChannel,
  KickLivestream,
  KickService,
} from 'src/integrations/kick/kick.service';
import { LiveStreamPlatformEnum } from 'src/shared/constants';
import { getErrorMessage } from 'src/shared/utils/errors';
import { CreateLiveStreamDto } from '../dtos/create-live-stream.dto';
import {
  LiveStreamProvider,
  LiveStreamProviderParams,
} from './live-stream-provider.interface';

type KickProviderParam = LiveStreamProviderParams & { username: string };

@Injectable()
export class KickProvider implements LiveStreamProvider {
  private logger = new Logger(KickProvider.name);

  constructor(private readonly kickService: KickService) {}

  async getLiveStreams(
    params: LiveStreamProviderParams[],
  ): Promise<CreateLiveStreamDto[]> {
    if (!params.length) return [];

    const pageParams = params.filter(
      (param): param is KickProviderParam => Boolean(param.username),
    );

    if (!pageParams.length) return [];

    try {
      const channels = await this.kickService.getChannelsBySlug(
        pageParams.map((param) => param.username),
      );
      const streams = await this.kickService.getLivestreamsByBroadcasterIds(
        channels.map((channel) => channel.broadcaster_user_id).filter(Boolean),
      );

      return pageParams
        .map((param) => {
          const channel = this.findChannel(channels, param.username);
          const stream = streams.find(
            (stream) =>
              stream.broadcaster_user_id === channel?.broadcaster_user_id,
          );

          if (!channel || !stream) return;

          return this.toLiveStreamDto(stream, channel, param.pageId);
        })
        .filter((stream): stream is CreateLiveStreamDto => Boolean(stream));
    } catch (error) {
      this.logger.error(
        `Failed to get live streams from Kick: ${getErrorMessage(error)}`,
      );
    }

    return [];
  }

  private findChannel(channels: KickChannel[], slug: string) {
    return channels.find(
      (channel) => channel.slug?.toLowerCase() === slug.toLowerCase(),
    );
  }

  private toLiveStreamDto(
    stream: KickLivestream,
    channel: KickChannel,
    pageId: number,
  ): CreateLiveStreamDto {
    const slug = stream.slug || channel.slug;

    return {
      title: stream.stream_title,
      channelId: String(stream.channel_id || stream.broadcaster_user_id),
      channelName: slug,
      imageUrl: stream.thumbnail,
      platform: LiveStreamPlatformEnum.KICK,
      viewerCount: stream.viewer_count,
      videoId: slug,
      startedAt: stream.started_at,
      pageId,
    };
  }
}
