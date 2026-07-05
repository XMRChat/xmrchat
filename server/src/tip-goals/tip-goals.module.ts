import { Module } from '@nestjs/common';
import { TipGoalsService } from './tip-goals.service';

@Module({
  providers: [TipGoalsService]
})
export class TipGoalsModule {}
