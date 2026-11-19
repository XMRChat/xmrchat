import { Expose, Type } from 'class-transformer';
import { AtomicToXmrTransform } from 'src/shared/decorators/atomic-to-xmr-transform.decorator';

export class MembershipLevelDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  @AtomicToXmrTransform()
  price: number;

  @Expose()
  duration: number;

  @Expose()
  createdAt: Date;
}

export class MembershipLevelRO {
  @Expose()
  @Type(() => MembershipLevelDto)
  membershipLevel: MembershipLevelDto;
}

export class MembershipLevelsRO {
  @Expose()
  @Type(() => MembershipLevelDto)
  membershipLevels: MembershipLevelDto[];
}
