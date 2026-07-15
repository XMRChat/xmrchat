import { Module } from '@nestjs/common';
import { TipGoalsService } from './tip-goals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipGoal } from './tip-goal.entity';
import { PagesModule } from 'src/pages/pages.module';
import { TipGoalsController } from './tip-goals.controller';

@Module({
  imports: [PagesModule, TypeOrmModule.forFeature([TipGoal])],
  providers: [TipGoalsService],
  exports: [TipGoalsService],
  controllers: [TipGoalsController],
})
export class TipGoalsModule {}
