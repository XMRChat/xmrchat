import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { getAxiosMessage } from 'src/shared/utils/errors';
import { KickTokenService } from './kick-token.service';

export interface KickChannel {
  broadcaster_user_id?: number;
  slug?: string;
}

export interface KickLivestream {
  broadcaster_user_id?: number;
  channel_id?: number;
  slug?: string;
  started_at?: string;
  stream_title?: string;
  thumbnail?: string;
  viewer_count?: number;
}

@Injectable()
export class KickService {
  constructor(
    private readonly httpService: HttpService,
    private readonly kickTokenService: KickTokenService,
  ) {}

  async getChannelsBySlug(slugs: string[]) {
    const uniqueSlugs = [...new Set(slugs.filter(Boolean))].slice(0, 50);
    if (!uniqueSlugs.length) return [];

    const accessToken = await this.kickTokenService.getClientToken();
    if (!accessToken) return [];

    try {
      const { data } = await this.httpService.axiosRef.get<{
        data?: KickChannel[];
      }>('https://api.kick.com/public/v1/channels', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          slug: uniqueSlugs,
        },
        paramsSerializer: {
          indexes: null,
        },
      });

      return data.data || [];
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to get channels from Kick: ${getAxiosMessage(error)}`,
      );
    }
  }

  async getLivestreamsByBroadcasterIds(broadcasterIds: number[]) {
    const uniqueIds = [
      ...new Set(broadcasterIds.filter((id): id is number => Boolean(id))),
    ].slice(0, 50);
    if (!uniqueIds.length) return [];

    const accessToken = await this.kickTokenService.getClientToken();
    if (!accessToken) return [];

    try {
      const { data } = await this.httpService.axiosRef.get<{
        data?: KickLivestream[];
      }>('https://api.kick.com/public/v1/livestreams', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          broadcaster_user_id: uniqueIds,
        },
        paramsSerializer: {
          indexes: null,
        },
      });

      return data.data || [];
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to get live streams from Kick: ${getAxiosMessage(error)}`,
      );
    }
  }
}
