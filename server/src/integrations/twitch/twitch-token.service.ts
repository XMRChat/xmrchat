import { HttpService } from '@nestjs/axios';
import { InjectQueue } from '@nestjs/bullmq';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Queue } from 'bullmq';
import { Cache } from 'cache-manager';
import { getErrorMessage } from 'src/shared/utils/errors';

@Injectable()
export class TwitchTokenService implements OnModuleInit {
  private logger = new Logger(TwitchTokenService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectQueue('notifications-email') private emailQueue: Queue,
  ) {}

  async onModuleInit() {
    try {
      const token = await this.getClientToken();
      if (token) return;
    } catch (error) {
      this.logger.error(`On module init: ${getErrorMessage(error)}`);
    }
  }

  // Used for getting client credentials token
  async getClientToken() {
    const token = await this.getCachedToken();

    if (token) return token;

    return this.getAndSaveClientToken();
  }

  async validateClientToken() {
    const token = await this.getCachedToken();

    if (!token) return false;

    try {
      await this.httpService.axiosRef.get(
        'https://id.twitch.tv/oauth2/validate',
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      return true;
    } catch (error) {
      this.clearToken();
      return false;
    }
  }

  async getAndSaveClientToken() {
    const clientId = this.configService.get('TWITCH_CLIENT_ID');
    const clientSecret = this.configService.get('TWITCH_CLIENT_SECRET');

    if (!clientId || !clientSecret) {
      this.logger.warn(
        'TWITCH_CLIENT_ID or TWITCH_CLIENT_SECRET are not set. Twitch client credentials token can not be generated.',
      );

      return null;
    }

    try {
      const { data } = await this.httpService.axiosRef.post<{
        access_token: string;
      }>('https://id.twitch.tv/oauth2/token', {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
      });

      await this.saveToken(data.access_token);

      return data.access_token;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to get twitch client credentials token',
      );
    }
  }

  async getCachedToken() {
    return this.cacheManager.get<string | null>(
      'twitch-client-credentials-token',
    );
  }

  async saveToken(token: string) {
    return await this.cacheManager.set(
      'twitch-client-credentials-token',
      token,
      {
        ttl: 60 * 60, // 1 hour
      } as any,
    );
  }

  async clearToken() {
    return await this.cacheManager.del('twitch-client-credentials-token');
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async refreshToken() {
    const valid = await this.validateClientToken();

    if (valid) return;

    try {
      await this.getAndSaveClientToken();
    } catch (error) {
      this.logger.error('Failed to refresh twitch client credentials token');
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  async upsertTokenRefreshReminder() {
    const token = this.configService.get('TWITCH_OAUTH_PASS')?.split(':')[1];

    if (!token) return;

    const { data } = await this.httpService.axiosRef.get(
      'https://id.twitch.tv/oauth2/validate',
      {
        headers: {
          Authorization: `OAuth ${token}`,
        },
      },
    );
    const expiresIn = data.expires_in;

    // Return if it is valid for more than 1 weeks
    if (expiresIn > 14 * 24 * 60 * 60) return;

    const emails =
      this.configService.get('PAGE_REPORT_RECEPIENTS')?.split(' ') || [];
    if (!emails.length) return;

    this.emailQueue.add('send-email', {
      to: emails,
      options: {
        subject: 'Twitch token update reminder',
        text: 'Twitch token update reminder',
        html: `Twitch token update reminder. Less that one week is remaining from expiration date, please update the token and get a new User access token token. 
          You can use this website "https://twitchapps.com/tokengen" to generate a new User access token token.`,
      },
    });
  }
}
