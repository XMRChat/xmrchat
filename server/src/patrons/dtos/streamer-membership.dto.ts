import { Expose, Transform, Type } from 'class-transformer';
import { MembershipLevelDto } from './membership-level.dto';

export class StreamerMembershipDto {
  @Expose()
  id: number;

  @Expose()
  @Transform(({ obj }) => obj.profile?.name)
  memberName: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  @Type(() => MembershipLevelDto)
  membershipLevel: MembershipLevelDto;

  @Expose()
  durationStart: Date;

  @Expose()
  durationEnd: Date;
}

export class StreamerMembershipsRO {
  @Expose()
  @Type(() => StreamerMembershipDto)
  memberships: StreamerMembershipDto[];
}

export class PatronPageMembershipDto extends StreamerMembershipDto {
  @Expose()
  status: string;
}

export class PatronPageMembershipsRO {
  @Expose()
  @Type(() => PatronPageMembershipDto)
  memberships: PatronPageMembershipDto[];
}
