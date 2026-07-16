import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TipGoalsService } from './tip-goals.service';
import { CreateTipGoalDto } from './dtos/create-tip-goal.dto';
import { User } from 'src/users/user.entity';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { Serialize } from 'src/shared/interceptors/serialize.interceptor';
import { TipGoalRO } from './dtos/tip-goal.dto';
import { UpdateTipGoalDto } from './dtos/update-tip-goal.dto';
import { IsPublic } from 'src/shared/decorators/is-public.decorator';

@Controller('tip-goals')
export class TipGoalsController {
  constructor(private readonly tipGoalsService: TipGoalsService) {}

  @Get('/')
  @Serialize(TipGoalRO)
  async find(@CurrentUser() user: User) {
    const result = await this.tipGoalsService.findMyTipGoal(user);
    return {
      tipGoal: result,
    };
  }

  @Get('/tips/:pagePath')
  @IsPublic()
  async findTipGoalAmount(@Param('pagePath') pagePath: string) {
    const amount = await this.tipGoalsService.findTipGoalAmount(pagePath);
    return {
      amount,
    };
  }

  @Post('/')
  async create(@Body() dto: CreateTipGoalDto, @CurrentUser() user: User) {
    await this.tipGoalsService.create(dto, user);
    return {
      message: 'Tip goal created successfully',
    };
  }

  @Put('/')
  async update(@Body() dto: UpdateTipGoalDto, @CurrentUser() user: User) {
    await this.tipGoalsService.update(dto, user);
    return {
      message: 'Tip goal updated successfully',
    };
  }
}
