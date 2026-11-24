import { Transform } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePatronMessageDto {
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  body: string;

  /** Empty = send now. */
  @IsOptional()
  @IsDateString()
  sendDatetime?: string | null;

  /** Empty = all membership levels on the page. */
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsInt({ each: true })
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map((id: unknown) => Number(id)) : value,
  )
  membershipLevelIds?: number[];
}
