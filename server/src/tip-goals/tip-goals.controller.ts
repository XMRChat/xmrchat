import { Body, Controller, Post } from '@nestjs/common';
import { TipGoalsService } from './tip-goals.service';
import { CreateTipGoalDto } from './dtos/create-tip-goal.dto';
import { User } from 'src/users/user.entity';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';

@Controller('tip-goals')
export class TipGoalsController {
  constructor(private readonly tipGoalsService: TipGoalsService) {}

  @Post('/')
  async create(@Body() dto: CreateTipGoalDto, @CurrentUser() user: User) {
    const result = await this.tipGoalsService.create(dto, user);
    return {
      message: 'Tip goal created successfully',
    };
  }
}
