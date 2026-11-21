import { Expose, Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PageRecipientShareDto } from 'src/page-recipients/dtos/recipient.dto';
import { AtomicToXmrTransform } from 'src/shared/decorators/atomic-to-xmr-transform.decorator';

export class CreateMembershipDto {
  @IsInt()
  @Type(() => Number)
  membershipLevelId: number;

  @IsString()
  @MinLength(2)
  @MaxLength(40)
  @Matches(/^[a-zA-Z0-9 ]+$/, {
    message: 'Name can only contain letters, numbers and spaces.',
  })
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(400)
  signal?: string;

  @IsOptional()
  @IsString()
  @MaxLength(400)
  simplex?: string;
}

export class PatronMembershipDto {
  @Expose()
  id: number;
}

export class MembershipCreateRO {
  @Expose()
  @AtomicToXmrTransform()
  amount: number;

  @Expose()
  paymentAddress: string;

  @Expose()
  @Type(() => PatronMembershipDto)
  membership: PatronMembershipDto;

  @Expose()
  @Type(() => PageRecipientShareDto)
  recipients: PageRecipientShareDto[];

  @Expose()
  url: string;

  @Expose()
  expiresAt: Date;

  // Only returned once when a new patron is created, the server only stores
  // its hash. It is not returned when a logged in patron is reused.
  @Expose()
  mnemonic?: string;
}
