import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TipGoal } from './tip-goal.entity';
import { Repository } from 'typeorm';
import { CreateTipGoalDto } from './dtos/create-tip-goal.dto';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { User } from 'src/users/user.entity';
import { Action } from 'src/shared/constants';
import { PagesService } from 'src/pages/pages.service';

@Injectable()
export class TipGoalsService {
  constructor(
    private readonly pagesService: PagesService,
    private readonly casl: CaslAbilityFactory,
    @InjectRepository(TipGoal)
    private repo: Repository<TipGoal>,
  ) {}

  async createTipGoal(dto: CreateTipGoalDto, user: User) {
    const page = await this.pagesService.findMyPage(user);
    if (!page) throw new NotFoundException('Page not found');

    const ability = await this.casl.createForUser(user);
    if (!ability.can(Action.Create, TipGoal))
      throw new ForbiddenException(
        'You are not authorized to create a tip goal',
      );

    const startTime = new Date(dto.startTime);
    if (startTime < new Date())
      throw new BadRequestException('Start time must be a date after today.');

    if (dto.endTime && new Date(dto.endTime) < startTime)
      throw new BadRequestException(
        'End time must be a date after start time.',
      );

    const created = this.repo.create({
      ...dto,
      page,
    });

    const tipGoal = await this.repo.save(created);
    return tipGoal;
  }
}
