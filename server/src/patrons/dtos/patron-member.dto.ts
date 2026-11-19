import { Expose, Type } from 'class-transformer';

export class PatronMemberDto {
  @Expose()
  name: string;
}

export class PatronMembersRO {
  @Expose()
  @Type(() => PatronMemberDto)
  members: PatronMemberDto[];
}
