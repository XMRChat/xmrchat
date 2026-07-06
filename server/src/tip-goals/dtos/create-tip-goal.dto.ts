import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { MoneroUtils } from 'monero-ts';

export class CreateTipGoalDto {
  @IsString()
  @MaxLength(80)
  name: string;

  @IsNumberString()
  @Transform(
    ({ value }) => {
      if (value === null || value === '') return null;
      return MoneroUtils.xmrToAtomicUnits(value).toString();
    },
    { toClassOnly: true },
  )
  amount?: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  @IsOptional()
  endTime?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
