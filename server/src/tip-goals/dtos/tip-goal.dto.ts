import { Expose, Transform, Type } from 'class-transformer';
import { MoneroUtils } from 'monero-ts';

export class TipGoalDto {
  @Expose()
  name: string;

  @Expose()
  @Transform(({ value }) => value && MoneroUtils.atomicUnitsToXmr(value))
  amount: string;

  @Expose()
  startTime: Date;

  @Expose()
  endTime?: Date;

  @Expose()
  description?: string;

  @Expose()
  isActive: boolean;
}

export class TipGoalRO {
  @Expose()
  @Type(() => TipGoalDto)
  tipGoal: TipGoalDto;
}
