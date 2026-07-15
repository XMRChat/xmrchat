import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserToken } from 'src/auth/user-tokens/user-token.entity';
import { CohostInvitation } from 'src/cohost/cohost-invitations/entities/cohost-invitation.entity';
import { File as FileEntity } from 'src/files/file.entity';
import { IntegrationConfig } from 'src/integrations/integration-configs.entity';
import { Coin } from 'src/integrations/trocador/coin.entity';
import { Link } from 'src/links/link.entity';
import { LiveStream } from 'src/live-streams/live-stream.entity';
import { NotificationPreference } from 'src/notification-preferences/notification-preferences.entity';
import { PageRecipient } from 'src/page-recipients/page-recipient.entity';
import { PageSetting } from 'src/page-settings/page-setting.entity';
import { PageTipTier } from 'src/page-tip-tiers/page-tip-tier.entity';
import { Page } from 'src/pages/page.entity';
import { Tier } from 'src/pages/tier.entity';
import { Payment } from 'src/payments/payment.entity';
import { SuperDm } from 'src/super-dms/super-dm.entity';
import { SuperDmMessage } from 'src/super-dms/super-dm-message.entity';
import { Swap } from 'src/swaps/swap.entity';
import { Tip } from 'src/tips/tip.entity';
import { User } from 'src/users/user.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { LinkVerification } from 'src/link-verifications/link-verification.entity';
import { TipReply } from 'src/tip-replies/tip-reply.entity';
import { TipGoal } from 'src/tip-goals/tip-goal.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService) => ({
        type: 'postgres',
        database: configService.get('DATABASE_NAME'),
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        entities: [
          User,
          UserToken,
          FileEntity,
          Page,
          Payment,
          Tip,
          Tier,
          PageSetting,
          Link,
          Coin,
          Swap,
          IntegrationConfig,
          NotificationPreference,
          PageRecipient,
          LiveStream,
          CohostInvitation,
          PageTipTier,
          SuperDm,
          SuperDmMessage,
          LinkVerification,
          TipReply,
          TipGoal,
        ],
        namingStrategy: new SnakeNamingStrategy(),
        migrationsRun: process.env.NODE_ENV === 'production',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
