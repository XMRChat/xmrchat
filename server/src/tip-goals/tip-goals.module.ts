import { Module } from '@nestjs/common';
import { TipGoalsService } from './tip-goals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipGoal } from './tip-goal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipGoal])],
  providers: [TipGoalsService],
})
export class TipGoalsModule {}
