import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipGoal } from './tip-goal.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TipGoalsService {
  constructor(
    @InjectRepository(TipGoal)
    private tipGoalRepository: Repository<TipGoal>,
  ) {}
}
