import { Expose, Type } from 'class-transformer';
import { PatronMessageStatus } from 'src/shared/constants';
import { MembershipLevelDto } from './membership-level.dto';

export class PatronMessageDto {
  @Expose()
  id: number;

  @Expose()
  body: string;

  @Expose()
  sendDatetime: Date;

  @Expose()
  status: PatronMessageStatus;

  @Expose()
  createdAt: Date;

  /** Empty array means all membership levels. */
  @Expose()
  @Type(() => MembershipLevelDto)
  membershipLevels: MembershipLevelDto[];
}

export class PatronMessageRO {
  @Expose()
  @Type(() => PatronMessageDto)
  message: PatronMessageDto;
}

export class PatronMessagesRO {
  @Expose()
  @Type(() => PatronMessageDto)
  messages: PatronMessageDto[];
}
