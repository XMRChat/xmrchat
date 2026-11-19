import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LwsModule } from 'src/lws/lws.module';
import { PagesModule } from 'src/pages/pages.module';
import { PaymentsModule } from 'src/payments/payments.module';
import { MembershipLevelEntity } from './membership-level.entity';
import { PatronContactEntity } from './patron-contact.entity';
import { PatronEntity } from './patron.entity';
import { PatronMembershipEntity } from './patron-membership.entity';
import { PatronMessageEntity } from './patron-message.entity';
import { PatronPageProfileEntity } from './patron-page-profile.entity';
import { PatronsService } from './patrons.service';
import { PatronsController } from './patrons.controller';

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
    LwsModule,
    PagesModule,
  ],
  providers: [PatronsService],
  exports: [TypeOrmModule, PatronsService],
  controllers: [PatronsController],
})
export class PatronsModule {}
