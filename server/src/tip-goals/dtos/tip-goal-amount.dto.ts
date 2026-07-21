import { Expose, Transform, Type } from 'class-transformer';
import { TipGoalDto } from './tip-goal.dto';
import { MoneroUtils } from 'monero-ts';

export class TipGoalAmountRO {
  @Expose()
  @Transform(({ value }) => value && MoneroUtils.atomicUnitsToXmr(value))
  tipsAmount: string;

  @Expose()
  @Type(() => TipGoalDto)
  tipGoal: TipGoalDto;
}
