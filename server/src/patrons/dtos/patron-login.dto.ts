import { Expose, Type } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { PatronDto } from './patron.dto';

export class PatronLoginDto {
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  mnemonic: string;
}

export class PatronLoginRO {
  @Expose()
  token: string;

  @Expose()
  @Type(() => PatronDto)
  patron: PatronDto;
}
