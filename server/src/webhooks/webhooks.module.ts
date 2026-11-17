import { Module } from '@nestjs/common';
import { WebhooksController } from './webhooks.controller';
import { PaymentsModule } from 'src/payments/payments.module';
import { PagesModule } from 'src/pages/pages.module';
import { TipsModule } from 'src/tips/tips.module';
import { SwapsModule } from 'src/swaps/swaps.module';
import { SuperDmsModule } from 'src/super-dms/super-dms.module';
import { PatronsModule } from 'src/patrons/patrons.module';

@Module({
  imports: [
    PaymentsModule,
    PagesModule,
    TipsModule,
    SwapsModule,
    SuperDmsModule,
    PatronsModule,
  ],
  controllers: [WebhooksController],
})
export class WebhooksModule {}
