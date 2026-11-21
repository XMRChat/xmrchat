import { Expose, Type } from 'class-transformer';
import { PageDto } from 'src/pages/dtos/page.dto';
import { StreamerMembershipDto } from './streamer-membership.dto';

// Membership of a patron on a page. The name is the one used on that page.
export class PatronMembershipDetailDto extends StreamerMembershipDto {
  @Expose()
  status: string;

  @Expose()
  @Type(() => PageDto)
  page: PageDto;
}

export class PatronContactDto {
  @Expose()
  channel: string;

  @Expose()
  destination: string;

  @Expose()
  enabled: boolean;

  @Expose()
  verified: boolean;
}

export class PatronDto {
  @Expose()
  @Type(() => PatronMembershipDetailDto)
  memberships: PatronMembershipDetailDto[];

  @Expose()
  @Type(() => PatronContactDto)
  contacts: PatronContactDto[];
}

export class PatronRO {
  @Expose()
  @Type(() => PatronDto)
  patron: PatronDto;
}
