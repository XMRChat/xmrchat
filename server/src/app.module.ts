import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { NotificationsModule } from './notifications/notifications.module';
import { FilesModule } from './files/files.module';
import { PagesModule } from './pages/pages.module';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { LwsModule } from './lws/lws.module';
import { PaymentsModule } from './payments/payments.module';
import { TipsModule } from './tips/tips.module';
import { WebhooksModule } from './webhooks/webhooks.module';
import { PricesModule } from './prices/prices.module';
import { PageSettingsModule } from './page-settings/page-settings.module';
import { LinksModule } from './links/links.module';
import { TwitchModule } from './integrations/twitch/twitch.module';
import { SwapsModule } from './swaps/swaps.module';
import { TrocadorModule } from './integrations/trocador/trocador.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AuditsModule } from './audits/audits.module';
import { WinstonModule } from 'nest-winston';
import winston from 'winston';
import 'winston-daily-rotate-file';
import { join } from 'path';
import { ClsModule } from 'nestjs-cls';
import { ThrottlerModule } from '@nestjs/throttler';
import { CommanderModule } from './commander/commander.module';
import { AdminModule } from './admin/admin.module';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { TipMessageModule } from './tip-message/tip-message.module';
import { BullModule } from '@nestjs/bullmq';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import expressBasicAuth from 'express-basic-auth';
import { CakeModule } from './integrations/cake/cake.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { NotificationPreferencesModule } from './notification-preferences/notification-preferences.module';
import { CaslModule } from './casl/casl.module';
import { TestModule } from './test/test.module';
import { PageRecipientsModule } from './page-recipients/page-recipients.module';
import { LiveStreamsModule } from './live-streams/live-streams.module';
import { CohostModule } from './cohost/cohost.module';
import { PageTipTiersModule } from './page-tip-tiers/page-tip-tiers.module';
import { SuperDmsModule } from './super-dms/super-dms.module';
import { PaymentFlowModule } from './payment-flow/payment-flow.module';
import { LinkVerificationsModule } from './link-verifications/link-verifications.module';
import { NetworkModule } from './network/network.module';
import { IsMoneroPrimaryAdrress } from './shared/validations/monero-primary-address.validation';
import { OfferingsModule } from './offerings/offerings.module';
import { EntitlementsModule } from './entitlements/entitlements.module';
import { TipsBroadcastModule } from './tips-broadcast/tips-broadcast.module';
import { TipRepliesModule } from './tip-replies/tip-replies.module';
import { TipGoalsModule } from './tip-goals/tip-goals.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    CacheModule.registerAsync({
      useFactory: async (config: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: config.get('REDIS_HOST'),
            port: +config.get('REDIS_PORT'),
          },
        });

        return {
          store: store as unknown as CacheStore,
        };
      },
      inject: [ConfigService],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize({ all: true }),
          ),
        }),
        new winston.transports.DailyRotateFile({
          filename: 'logs/log-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '90d',
        }),
      ],
      format: winston.format.combine(
        winston.format.align(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message, context }) => {
          return `[${timestamp}] ${level}: ${message} ${context ? `[${context}]` : ''}`;
        }),
      ),
    }),
    ClsModule.forRoot({
      middleware: { mount: true },
      global: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 120,
      },
    ]),
    I18nModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          fallbackLanguage: config.get('DEFAULT_LOCALE') || 'en',
          loaderOptions: {
            path: join(__dirname, '/i18n/'),
            watch: true,
          },
        };
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),
    BullModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get('REDIS_HOST'),
          port: +config.get('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    BullBoardModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        route: 'queues',
        adapter: ExpressAdapter,
        middleware: expressBasicAuth({
          challenge: true,
          users: {
            [config.get('BULLBOARD_USERNAME')]:
              config.get('BULLBOARD_PASSWORD'),
          },
        }),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    DatabaseModule,
    NotificationsModule,
    FilesModule,
    PagesModule,
    LwsModule,
    PaymentsModule,
    TipsModule,
    WebhooksModule,
    PricesModule,
    PageSettingsModule,
    LinksModule,
    TwitchModule,
    CakeModule,
    SwapsModule,
    TrocadorModule,
    AuditsModule,
    CommanderModule,
    AdminModule,
    TipMessageModule,
    IntegrationsModule,
    NotificationPreferencesModule,
    CaslModule,
    PageRecipientsModule,
    ...(process.env.TEST_ENV === 'true' ? [TestModule] : []),
    LiveStreamsModule,
    CohostModule,
    PageTipTiersModule,
    SuperDmsModule,
    PaymentFlowModule,
    LinkVerificationsModule,
    NetworkModule,
    OfferingsModule,
    EntitlementsModule,
    TipsBroadcastModule,
    TipRepliesModule,
    TipGoalsModule,
  ],
  controllers: [AppController],
  providers: [AppService, IsMoneroPrimaryAdrress],
})
export class AppModule { }
