import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PagesService } from 'src/pages/pages.service';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { IsPublic } from 'src/shared/decorators/is-public.decorator';
import { Serialize } from 'src/shared/interceptors/serialize.interceptor';
import { User } from 'src/users/user.entity';
import {
  CreateMembershipLevelDto,
} from './dtos/create-membership-level.dto';
import {
  MembershipLevelRO,
  MembershipLevelsRO,
} from './dtos/membership-level.dto';
import { PatronMembersRO } from './dtos/patron-member.dto';
import { UpdateMembershipLevelDto } from './dtos/update-membership-level.dto';
import { PatronsService } from './patrons.service';

@Controller('patrons')
export class PatronsController {
  constructor(
    private patronsService: PatronsService,
    private pagesService: PagesService,
  ) {}

  @Get('/:pageSlug/state')
  @IsPublic()
  async state(@Param('pageSlug') pageSlug: string) {
    const page = await this.pagesService.findByPath(pageSlug);
    if (!page) throw new NotFoundException('Page not found');

    const active = await this.patronsService.isPatronActive(page);
    return { active };
  }

  @Get('/:pageSlug/membership-levels')
  @IsPublic()
  @Serialize(MembershipLevelsRO)
  async findPageMembershipLevels(@Param('pageSlug') pageSlug: string) {
    const page = await this.pagesService.findByPath(pageSlug);
    if (!page) throw new NotFoundException('Page not found');

    const membershipLevels =
      await this.patronsService.findMembershipLevelsByPage(page);
    return { membershipLevels };
  }

  @Get('/:pageSlug/active-members')
  @IsPublic()
  @Serialize(PatronMembersRO)
  async findPageActiveMembers(@Param('pageSlug') pageSlug: string) {
    const page = await this.pagesService.findByPath(pageSlug);
    if (!page) throw new NotFoundException('Page not found');

    const members = await this.patronsService.findActiveMembers(page);
    return { members };
  }

  @Get('/membership-levels')
  @Serialize(MembershipLevelsRO)
  async findAllMembershipLevels(@CurrentUser() user: User) {
    const membershipLevels =
      await this.patronsService.findAllMembershipLevels(user);
    return { membershipLevels };
  }

  @Get('/membership-levels/:id')
  @Serialize(MembershipLevelRO)
  async findOneMembershipLevel(@Param('id', ParseIntPipe) id: number) {
    const membershipLevel =
      await this.patronsService.findMembershipLevelById(id);
    return { membershipLevel };
  }

  @Post('/membership-levels')
  @Serialize(MembershipLevelRO)
  async createMembershipLevel(
    @Body() dto: CreateMembershipLevelDto,
    @CurrentUser() user: User,
  ) {
    const membershipLevel = await this.patronsService.createMembershipLevel(
      dto,
      user,
    );
    return { membershipLevel };
  }

  @Put('/membership-levels/:id')
  async updateMembershipLevel(
    @Body() dto: UpdateMembershipLevelDto,
    @CurrentUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.patronsService.updateMembershipLevel(id, dto, user);
    return { message: 'Membership level updated.' };
  }
}
