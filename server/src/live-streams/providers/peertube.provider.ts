import { Injectable, Logger } from '@nestjs/common';
import {
  PeertubeService,
  PeertubeVideo,
} from 'src/integrations/peertube/peertube.service';
import { LinksService } from 'src/links/links.service';
import { LinkPlatformEnum, LiveStreamPlatformEnum } from 'src/shared/constants';
import { getErrorMessage } from 'src/shared/utils/errors';
import { CreateLiveStreamDto } from '../dtos/create-live-stream.dto';

@Injectable()
export class PeertubeProvider {
  private logger = new Logger(PeertubeProvider.name);

  constructor(
    private readonly linksService: LinksService,
    private readonly peertubeService: PeertubeService,
  ) {}

  async getLiveStreams(): Promise<CreateLiveStreamDto[]> {
    const links = await this.linksService.findByPlatform(
      LinkPlatformEnum.PEERTUBE,
    );
    if (!links.length) return [];

    const requests = links.map(async (link) => {
      try {
        const result = await this.peertubeService.getLiveStreams(link.value);
        return { ...result, pageId: link.page.id };
      } catch (error) {
        this.logger.warn(
          `Failed to get peertube live streams for page ${link.page.id}: ${getErrorMessage(error)}`,
        );
      }
    });

    const responses = await Promise.all(requests);
    const result: { pageId: number; origin: string; stream: PeertubeVideo }[] =
      [];

    responses
      .filter((r) => r?.streams?.length)
      .forEach((r) => {
        r.streams.forEach((stream) => {
          result.push({
            pageId: r.pageId,
            origin: r.origin,
            stream,
          });
        });
      });

    return result.map(({ pageId, origin, stream }) => ({
      title: stream.name,
      description: stream.description || stream.truncatedDescription,
      imageUrl: this.getImageUrl(stream, origin),
      platform: LiveStreamPlatformEnum.PEERTUBE,
      viewerCount: stream.viewers,
      videoId: stream.shortUUID || stream.uuid || String(stream.id || ''),
      channelId: stream.channel?.name,
      channelName: stream.channel?.displayName || stream.channel?.name,
      startedAt: stream.publishedAt || stream.createdAt,
      data: { embedUrl: this.getEmbedUrl(stream, origin) },
      pageId,
    }));
  }

  private getImageUrl(stream: PeertubeVideo, origin: string) {
    const thumbnail = stream.thumbnails
      ?.slice()
      .sort((a, b) => (b.width || 0) - (a.width || 0))
      .find((item) => item.fileUrl);

    if (thumbnail?.fileUrl) return thumbnail.fileUrl;
    if (stream.previewPath) return `${origin}${stream.previewPath}`;
    if (stream.thumbnailPath) return `${origin}${stream.thumbnailPath}`;
  }

  private getEmbedUrl(stream: PeertubeVideo, origin: string) {
    if (stream.embedPath) return `${origin}${stream.embedPath}`;

    const videoId = stream.shortUUID || stream.uuid || stream.id;
    if (videoId) return `${origin}/videos/embed/${videoId}`;
  }
}
