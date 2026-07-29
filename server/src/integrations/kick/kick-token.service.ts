import { HttpService } from '@nestjs/axios';
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
import { Cache } from 'cache-manager';
import { getAxiosMessage, getErrorMessage } from 'src/shared/utils/errors';

@Injectable()
export class KickTokenService implements OnModuleInit {
  private logger = new Logger(KickTokenService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async onModuleInit() {
    try {
      await this.getClientToken();
    } catch (error) {
      this.logger.error(`On module init: ${getErrorMessage(error)}`);
    }
  }

  async getClientToken() {
    const token = await this.getCachedToken();

    if (token) return token;

    return this.getAndSaveClientToken();
  }

  async getAndSaveClientToken() {
    const clientId = this.configService.get('KICK_CLIENT_ID');
    const clientSecret = this.configService.get('KICK_CLIENT_SECRET');

    if (!clientId || !clientSecret) {
      this.logger.warn(
        'KICK_CLIENT_ID or KICK_CLIENT_SECRET are not set. Kick client credentials token can not be generated.',
      );

      return null;
    }

    try {
      const { data } = await this.httpService.axiosRef.post<{
        access_token: string;
        expires_in?: number;
      }>('https://id.kick.com/oauth/token', {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      await this.saveToken(data.access_token, data.expires_in);

      return data.access_token;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to get kick client credentials token: ${getAxiosMessage(error)}`,
      );
    }
  }

  async getCachedToken() {
    return this.cacheManager.get<string | null>(
      'kick-client-credentials-token',
    );
  }

  async saveToken(token: string, expiresIn?: number) {
    const ttl = Math.max((expiresIn || 3600) - 60, 60);

    return await this.cacheManager.set('kick-client-credentials-token', token, {
      ttl,
    } as any);
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async refreshToken() {
    try {
      await this.getAndSaveClientToken();
    } catch (error) {
      this.logger.error('Failed to refresh kick client credentials token');
    }
  }
}
