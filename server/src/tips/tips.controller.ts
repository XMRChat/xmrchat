import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { CreateTipDto } from './dtos/create-tip.dto';
import { TipsService } from './tips.service';
import { IsPublic } from 'src/shared/decorators/is-public.decorator';
import {
  Serialize,
  serializer,
} from 'src/shared/interceptors/serialize.interceptor';
import { TipDto, TipDtoRO } from './dtos/tip.dto';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { UpdateTipDto } from './dtos/update-tip.dto';

@Controller('tips')
export class TipsController {
  constructor(private tipsService: TipsService) {}

  @IsPublic()
  @Serialize(TipDtoRO)
  @Post('')
  createTip(@Body() body: CreateTipDto) {
    return this.tipsService.createTip(body);
  }

  @Get('/page/:slug')
  @IsPublic()
  async getPageTips(@Param('slug') slug: string, @CurrentUser() user: User) {
    const { tips, page } = await this.tipsService.getTipsByPageSlug(slug, user);
    const isStreamer = page.userId == user?.id;
    const serialized = serializer(TipDto, tips, {
      groups: isStreamer ? ['streamer'] : [],
    });

    return serialized;
  }

  @Post(`/create-test-tip`)
  async createTestTip(@Body() body: CreateTipDto) {
    await this.tipsService.createTestTip(body);
    return { message: 'Test tip created.' };
  }

  @Put('/:id')
  updateTip(
    @CurrentUser() user: User,
    @Body() body: UpdateTipDto,
    @Param('id') id: number,
  ) {
    return this.tipsService.updateTip(id, body, user);
  }

  @Get('/test/test')
  @IsPublic()
  test() {
    return this.tipsService.deleteExpiredTips();
  }
}
