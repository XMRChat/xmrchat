import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { XmrToAtomicTransform } from 'src/shared/decorators/xmr-to-atomic-transform.decorator';

export class CreateMembershipLevelDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;

  @IsString()
  @XmrToAtomicTransform({ toClassOnly: true })
  price: string;

  // Membership duration in days
  @IsInt()
  @Min(1)
  @Max(365)
  @Type(() => Number)
  duration: number;
}
