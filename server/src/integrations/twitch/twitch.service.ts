import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, client as tmiClient } from 'tmi.js';
import { TwitchTokenService } from './twitch-token.service';
import { getAxiosMessage, getErrorMessage } from 'src/shared/utils/errors';

@Injectable()
export class TwitchService implements OnModuleInit {
  private logger = new Logger(TwitchService.name);
  public oauthPass = this.configService.get('TWITCH_OAUTH_PASS');
  public botName = this.configService.get('TWITCH_BOT_NAME');
  private client: Client;

  private clientId = this.configService.get('TWITCH_CLIENT_ID');
  private clientSecret = this.configService.get('TWITCH_CLIENT_SECRET');
  private initialized = false;

  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
    private twitchTokenService: TwitchTokenService,
  ) {
    this.client = new tmiClient({
      channels: [],
      options: { debug: true },
      identity: {
        username: this.botName,
        password: this.oauthPass,
      },
    });

    this.connectToServer();
  }

  async onModuleInit() {
    if (!this.clientId || !this.clientSecret) {
      this.logger.warn(
        'TWITCH_CLIENT_ID or TWITCH_CLIENT_SECRET are not set. Twitch integrations will not work.',
      );
      return;
    }
    this.initialized = true;
  }

  async getTokens() {
    if (!this.initialized) {
      throw new InternalServerErrorException(
        'TWITCH_CLIENT_ID or TWITCH_CLIENT_SECRET are not set.',
      );
    }

    const accessToken = await this.twitchTokenService.getClientToken();
    const clientId = this.configService.get('TWITCH_CLIENT_ID');
    return { accessToken, clientId };
  }

  async connectToServer() {
    try {
      await this.client.connect();
    } catch (error) {
      console.log('Twitch connect to server error: ', error);
    }
  }

  async sendMessage(channel: string, message: string) {
    try {
      await this.client.say(channel, message);
    } catch (error) {
      this.logger.error('Sending message error', error);
    }
  }

  async channelExists(channel: string) {
    try {
      const { accessToken, clientId } = await this.getTokens();

      const res = await this.httpService.axiosRef.get(
        `https://api.twitch.tv/helix/users?login=${channel}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Client-ID': clientId,
          },
        },
      );
      if (res.data.data.length >= 1) return true;
      return false;
    } catch (error) {
      console.log(
        'Twitch api error on getting channel name',
        getErrorMessage(error),
      );
      if (
        (error as any)?.response?.data?.status === 403 ||
        (error as any)?.response?.data?.status === 401
      )
        return true;
      return false;
    }
  }

  async getLiveStreams(channels: string[]) {
    const { accessToken, clientId } = await this.getTokens();

    channels = channels.filter((channel) => {
      return channel && /^[a-zA-Z0-9_]+$/.test(channel);
    });

    if (!channels.length) return [];

    const params = [];

    channels.forEach((channel) => {
      params.push(`user_login=${channel}`);
    });

    try {
      const { data } = await this.httpService.axiosRef.get(
        `https://api.twitch.tv/helix/streams?${params.join('&')}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Client-ID': clientId,
          },
        },
      );

      return data.data;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to get live streams from Twitch: ${getAxiosMessage(error)}`,
      );
    }
  }
}
