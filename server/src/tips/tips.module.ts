import { Module } from '@nestjs/common';
import { TipsController } from './tips.controller';
import { TipsService } from './tips.service';
import { PagesModule } from 'src/pages/pages.module';
import { LwsModule } from 'src/lws/lws.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tip } from './tip.entity';
import { PaymentsModule } from 'src/payments/payments.module';
import { TipsGateway } from './tips.gateway';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { PricesModule } from 'src/prices/prices.module';
import { SwapsModule } from 'src/swaps/swaps.module';
import { PageSettingsModule } from 'src/page-settings/page-settings.module';
import { TipMessageModule } from 'src/tip-message/tip-message.module';
import { PageRecipientsModule } from 'src/page-recipients/page-recipients.module';
import { PaymentFlowModule } from 'src/payment-flow/payment-flow.module';
import { TipsBroadcastModule } from 'src/tips-broadcast/tips-broadcast.module';
import { PatronsModule } from 'src/patrons/patrons.module';

@Module({
  controllers: [TipsController],
  providers: [TipsService, TipsGateway],
  imports: [
    PagesModule,
    PaymentsModule,
    LwsModule,
    NotificationsModule,
    PricesModule,
    SwapsModule,
    TypeOrmModule.forFeature([Tip]),
    PageSettingsModule,
    TipMessageModule,
    PageRecipientsModule,
    PaymentFlowModule,
    TipsBroadcastModule,
    PatronsModule,
  ],
  exports: [TipsService, TipsGateway],
})
export class TipsModule {}
