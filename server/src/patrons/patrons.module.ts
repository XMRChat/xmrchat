import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LwsModule } from 'src/lws/lws.module';
import { PaymentsModule } from 'src/payments/payments.module';
import { MembershipLevelEntity } from './membership-level.entity';
import { PatronContactEntity } from './patron-contact.entity';
import { PatronEntity } from './patron.entity';
import { PatronMembershipEntity } from './patron-membership.entity';
import { PatronMessageEntity } from './patron-message.entity';
import { PatronPageProfileEntity } from './patron-page-profile.entity';
import { PatronsService } from './patrons.service';

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
  ],
  providers: [PatronsService],
  exports: [TypeOrmModule, PatronsService],
})
export class PatronsModule {}
