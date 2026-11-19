import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LwsModule } from 'src/lws/lws.module';
import { PageRecipientsModule } from 'src/page-recipients/page-recipients.module';
import { PagesModule } from 'src/pages/pages.module';
import { PaymentFlowModule } from 'src/payment-flow/payment-flow.module';
import { PaymentsModule } from 'src/payments/payments.module';
import { MembershipLevelEntity } from './membership-level.entity';
import { PatronContactEntity } from './patron-contact.entity';
import { PatronEntity } from './patron.entity';
import { PatronMembershipEntity } from './patron-membership.entity';
import { PatronMessageEntity } from './patron-message.entity';
import { PatronPageProfileEntity } from './patron-page-profile.entity';
import { PatronsService } from './patrons.service';
import { PatronsController } from './patrons.controller';
import { PatronsGateway } from './patrons.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PatronEntity,
      PatronPageProfileEntity,
      MembershipLevelEntity,
      PatronMembershipEntity,
      PatronContactEntity,
      PatronMessageEntity,
    ]),
    PaymentsModule,
    PaymentFlowModule,
    PageRecipientsModule,
    LwsModule,
    PagesModule,
  ],
  providers: [PatronsService, PatronsGateway],
  exports: [TypeOrmModule, PatronsService, PatronsGateway],
  controllers: [PatronsController],
})
export class PatronsModule {}
