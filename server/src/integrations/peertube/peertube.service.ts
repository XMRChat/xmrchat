import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { getAxiosMessage } from 'src/shared/utils/errors';

export interface PeertubeVideo {
  id?: number;
  uuid?: string;
  shortUUID?: string;
  name?: string;
  description?: string;
  truncatedDescription?: string;
  isLive?: boolean;
  viewers?: number;
  thumbnailPath?: string;
  previewPath?: string;
  thumbnails?: { fileUrl?: string; width?: number }[];
  embedPath?: string;
  createdAt?: string;
  publishedAt?: string;
  channel?: {
    name?: string;
    displayName?: string;
  };
}

type PeertubeChannelUrl = {
  origin: string;
  channel: string;
};

@Injectable()
export class PeertubeService {
  constructor(private http: HttpService) {}

  async getLiveStreams(
    url?: string,
  ): Promise<{ origin: string; streams: PeertubeVideo[] }> {
    const { origin, channel } = this.parseChannelUrl(url);

    try {
      const endpoint = `${origin}/api/v1/video-channels/${encodeURIComponent(channel)}/videos`;
      const { data } = await this.http.axiosRef.get<{
        data?: PeertubeVideo[];
      }>(endpoint, {
        params: {
          count: 25,
          isLive: true,
        },
      });

      return {
        origin,
        streams: (data.data || []).filter((video) => video.isLive),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Error getting list of livestreams from peertube. ${getAxiosMessage(error)}`,
      );
    }
  }

  parseChannelUrl(url?: string): PeertubeChannelUrl {
    if (!url) throw new BadRequestException('URL is required');

    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      throw new BadRequestException('A valid PeerTube URL is required');
    }

    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new BadRequestException('PeerTube URL must use http or https');
    }

    const origin = parsed.origin;
    const parts = parsed.pathname.split('/').filter(Boolean);
    const [type, channel] = parts;

    if (
      (type === 'video-channels' || type === 'c') &&
      channel &&
      (parts.length === 2 || (parts.length === 3 && parts[2] === 'videos'))
    ) {
      return { origin, channel };
    }

    throw new BadRequestException('A PeerTube channel URL is required');
  }
}
