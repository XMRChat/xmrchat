import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Put,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { PagesService } from './pages.service';
import { ReserveSlugDto } from './dtos/reserve-slug.dto';
import { User } from 'src/users/user.entity';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { Serialize } from 'src/shared/interceptors/serialize.interceptor';
import { SearchPageDto } from './dtos/search-page.dto';
import { UpdatePageDto } from './dtos/update-page.dto';
import { PageDto } from './dtos/page.dto';
import { StreamerPageDto, StreamerPageRO } from './dtos/streamer-page.dto';
import { IsPublic } from 'src/shared/decorators/is-public.decorator';
import { CheckSlugDto } from './dtos/check-slug.dto';
import { ConfigService } from '@nestjs/config';
import { Action, PageStatusEnum } from 'src/shared/constants';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';

@Controller('pages')
export class PagesController {
  constructor(
    private pagesService: PagesService,
    private configService: ConfigService,
    private casl: CaslAbilityFactory,
  ) {}

  @Post('/check-slug')
  checkSlug(@Body() body: CheckSlugDto) {
    return this.pagesService.checkSlug(body.slug);
  }

  @Post('/reserve-slug')
  reserveSlug(@Body() body: ReserveSlugDto, @CurrentUser() user: User) {
    return this.pagesService.reserveSlug(body, user);
  }

  @Get('/search')
  @IsPublic()
  @Serialize(SearchPageDto)
  searchPages(@Query() query: any) {
    const slug = query.search;
    const offset = query.offset;
    const limit = query.limit;
    const hasLinks = query.hasLinks
      ? [].concat(query.hasLinks).filter(Boolean)
      : undefined;

    return this.pagesService.searchPages(slug, offset, limit, hasLinks);
  }

  @Get('/sitemap')
  @IsPublic()
  @Serialize(SearchPageDto)
  sitemapPages() {
    return this.pagesService.sitemapPages();
  }

  @Get('/:slug')
  @IsPublic()
  @Serialize(PageDto)
  async getPage(@Param('slug') slug: string) {
    const page = await this.pagesService.findByPath(slug);

    if (!page) throw new NotFoundException('Page not found');

    if (page.status === PageStatusEnum.DEACTIVE)
      throw new NotFoundException('Page not found');

    page.minTipAmount =
      page.minTipAmount || this.configService.get('MIN_TIP_AMOUNT');

    return page;
  }

  @Get('')
  @Serialize(StreamerPageRO)
  async getMyPage(@CurrentUser() user: User) {
    const page = await this.pagesService.findMyPage(user);

    const ability = await this.casl.createForUser(user);
    const abilityResult = {
      makeTipPrivate: ability.can(Action.MakeTipPrivate, page),
      makeTipPublic: ability.can(Action.MakeTipPublic, page),
    };

    if (page) Object.assign(page, { ability: abilityResult });

    return { page };
  }

  @Put('/:slug')
  @Serialize(StreamerPageDto)
  updatePage(
    @Param('slug') slug: string,
    @Body() body: UpdatePageDto,
    @CurrentUser() user: User,
  ) {
    return this.pagesService.update(slug, body, user);
  }
}
