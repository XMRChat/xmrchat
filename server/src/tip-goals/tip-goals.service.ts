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
import { UpdateTipGoalDto } from './dtos/update-tip-goal.dto';
import { TipsService } from 'src/tips/tips.service';

@Injectable()
export class TipGoalsService {
  constructor(
    private readonly pagesService: PagesService,
    private readonly casl: CaslAbilityFactory,
    private readonly tipsService: TipsService,
    @InjectRepository(TipGoal)
    private repo: Repository<TipGoal>,
  ) {}

  async findOne(id: number) {
    if (!id) throw new BadRequestException('Id is required');

    const tipGoal = await this.repo.findOne({
      where: { id },
    });
    if (!tipGoal) throw new NotFoundException('Tip goal not found');
    return tipGoal;
  }

  async findMyTipGoal(user: User) {
    const page = await this.pagesService.findMyPage(user);
    if (!page) throw new NotFoundException('Page not found');

    const tipGoal = await this.findOneByPageIdOptional(page.id);
    return tipGoal;
  }

  async findOneByPageId(pageId: number) {
    if (!pageId) throw new BadRequestException('Page id is required');

    const tipGoal = await this.findOneByPageIdOptional(pageId);
    if (!tipGoal) throw new NotFoundException('Tip goal not found');
    return tipGoal;
  }

  async findOneByPageIdOptional(pageId: number) {
    if (!pageId) throw new BadRequestException('Page id is required');

    const tipGoal = await this.repo.findOne({
      where: { page: { id: pageId } },
    });
    return tipGoal;
  }

  async create(dto: CreateTipGoalDto, user: User) {
    const page = await this.pagesService.findMyPage(user);
    if (!page) throw new NotFoundException('Page not found');

    const ability = await this.casl.createForUser(user);
    if (!ability.can(Action.Create, TipGoal))
      throw new ForbiddenException(
        'You are not authorized to create a tip goal',
      );

    const { isValid, message } = await this.validateDates({
      startTime: new Date(dto.startTime),
      endTime: dto.endTime && new Date(dto.endTime),
      baseTime: new Date(),
    });
    if (!isValid) throw new BadRequestException(message);

    const created = this.repo.create({
      ...dto,
      page,
    });

    const tipGoal = await this.repo.save(created);
    return tipGoal;
  }

  async update(dto: UpdateTipGoalDto, user: User) {
    const page = await this.pagesService.findMyPage(user);
    if (!page) throw new NotFoundException('Page not found');

    const ability = await this.casl.createForUser(user);
    if (!ability.can(Action.Update, TipGoal))
      throw new ForbiddenException(
        'You are not authorized to update a tip goal',
      );

    const tipGoal = await this.findOneByPageId(page.id);
    if (!tipGoal) throw new NotFoundException('Tip goal not found');

    const { isValid, message } = await this.validateDates({
      startTime: new Date(dto.startTime),
      endTime: dto.endTime && new Date(dto.endTime),
      baseTime: new Date(Math.min(Date.now(), tipGoal.startTime.getTime())),
    });

    if (!isValid) throw new BadRequestException(message);

    Object.assign(tipGoal, dto);
    const result = await this.repo.save(tipGoal);
    return result;
  }

  async findTipGoalAmount(pagePath: string) {
    const page = await this.pagesService.findByPath(pagePath);
    if (!page) throw new NotFoundException('Page not found');

    const tipGoal = await this.findOneByPageId(page.id);
    if (!tipGoal) return null;

    const tipsAmount = await this.tipsService.getTipsInDateRange(
      pagePath,
      tipGoal.startTime.toISOString(),
      tipGoal.endTime?.toISOString(),
    );
    return tipsAmount;
  }

  // For create base time is now, for edit base time is min of now and start time
  async validateDates({
    startTime,
    endTime,
    baseTime = new Date(),
  }: {
    startTime: Date;
    endTime?: Date;
    baseTime?: Date;
  }) {
    if (startTime < baseTime)
      return {
        isValid: false,
        message: 'Start time should be a date after today.',
      };
    if (endTime && endTime < startTime)
      return {
        isValid: false,
        message: 'End time should be a date after start time.',
      };
    return {
      isValid: true,
    };
  }
}
