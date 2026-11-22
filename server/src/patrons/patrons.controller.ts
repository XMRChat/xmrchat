import {
  Body,
  Controller,
  Get,
  Header,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { seconds, Throttle } from '@nestjs/throttler';
import { CurrentPatron } from 'src/shared/decorators/current-patron.decorator';
import { PatronEntity } from './patron.entity';
import { OptionalPatronAuthGuard, PatronAuthGuard } from './patron-auth.guard';
import { PatronLoginDto, PatronLoginRO } from './dtos/patron-login.dto';
import { PatronRO } from './dtos/patron.dto';
import { PagesService } from 'src/pages/pages.service';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { IsPublic } from 'src/shared/decorators/is-public.decorator';
import { Serialize } from 'src/shared/interceptors/serialize.interceptor';
import { User } from 'src/users/user.entity';
import {
  CreateMembershipDto,
  MembershipCreateRO,
} from './dtos/create-membership.dto';
import { CreateMembershipLevelDto } from './dtos/create-membership-level.dto';
import {
  MembershipLevelRO,
  MembershipLevelsRO,
} from './dtos/membership-level.dto';
import { PatronMembersRO } from './dtos/patron-member.dto';
import {
  PatronPageMembershipsRO,
  StreamerMembershipsRO,
} from './dtos/streamer-membership.dto';
import { UpdateMembershipLevelDto } from './dtos/update-membership-level.dto';
import { UpdatePatronContactsDto } from './dtos/update-patron-contacts.dto';
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

  @Get('/:pageSlug/my-memberships')
  @IsPublic()
  @UseGuards(PatronAuthGuard)
  @Serialize(PatronPageMembershipsRO)
  async findMyMembershipsOnPage(
    @Param('pageSlug') pageSlug: string,
    @CurrentPatron() currentPatron: PatronEntity,
  ) {
    const page = await this.pagesService.findByPath(pageSlug);
    if (!page) throw new NotFoundException('Page not found');

    const memberships = await this.patronsService.findMyMembershipsOnPage(
      currentPatron.id,
      page,
    );
    return { memberships };
  }

  @Post('/:pageSlug/memberships')
  @IsPublic()
  @UseGuards(OptionalPatronAuthGuard)
  @Serialize(MembershipCreateRO)
  async createMembership(
    @Param('pageSlug') pageSlug: string,
    @Body() dto: CreateMembershipDto,
    @CurrentPatron() patron?: PatronEntity,
  ) {
    return await this.patronsService.createMembership(pageSlug, dto, patron);
  }

  @Post('/login')
  @IsPublic()
  @Throttle({ default: { ttl: seconds(60), limit: 10 } })
  @Serialize(PatronLoginRO)
  async login(@Body() dto: PatronLoginDto) {
    return await this.patronsService.login(dto.mnemonic);
  }

  @Get('/me')
  @IsPublic()
  @UseGuards(PatronAuthGuard)
  @Serialize(PatronRO)
  async me(@CurrentPatron() currentPatron: PatronEntity) {
    const patron = await this.patronsService.getPatron(currentPatron.id);
    return { patron };
  }

  @Put('/me/contacts')
  @IsPublic()
  @UseGuards(PatronAuthGuard)
  @Serialize(PatronRO)
  async updateContacts(
    @CurrentPatron() currentPatron: PatronEntity,
    @Body() dto: UpdatePatronContactsDto,
  ) {
    const patron = await this.patronsService.updateContacts(
      currentPatron.id,
      dto,
    );
    return { patron };
  }

  @Get('/memberships/active')
  @Serialize(StreamerMembershipsRO)
  async findActiveMemberships(@CurrentUser() user: User) {
    const memberships = await this.patronsService.findActiveMemberships(user);
    return { memberships };
  }

  @Get('/memberships/expired')
  @Serialize(StreamerMembershipsRO)
  async findExpiredMemberships(@CurrentUser() user: User) {
    const memberships = await this.patronsService.findExpiredMemberships(user);
    return { memberships };
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
