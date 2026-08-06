import {
  AbilityBuilder,
  createMongoAbility,
  ExtractSubjectType,
  InferSubjects,
  MongoAbility,
  MongoQuery,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CohostInvitation } from 'src/cohost/cohost-invitations/entities/cohost-invitation.entity';
import { PageSetting } from 'src/page-settings/page-setting.entity';
import { PageTipTier } from 'src/page-tip-tiers/page-tip-tier.entity';
import { Page } from 'src/pages/page.entity';
import { Action, PageSettingKey, RolesEnum } from 'src/shared/constants/enum';
import { SuperDm } from 'src/super-dms/super-dm.entity';
import { TipGoal } from 'src/tip-goals/tip-goal.entity';
import { TipReply } from 'src/tip-replies/tip-reply.entity';
import { Tip } from 'src/tips/tip.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

type Subjects =
  | InferSubjects<
      | typeof User
      | typeof CohostInvitation
      | typeof Page
      | typeof Tip
      | typeof PageSetting
      | typeof PageTipTier
      | typeof TipReply
      | typeof TipGoal
    >
  | 'notification'
  | 'cohost'
  | 'integration'
  | 'all';

export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  constructor(@InjectRepository(Page) private pageRepo: Repository<Page>) {}

  async findUserPage(user: User) {
    if (!user.id) return null;

    return this.pageRepo.findOne({
      where: { user: { id: user.id } },
    });
  }

  async createForUser(user: User, page?: Page) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    const isAdmin = user.roles.includes(RolesEnum.ADMIN);
    const pageResult = page || (await this.findUserPage(user));

    if (isAdmin) {
      can(Action.Manage, 'all');
    }

    if (pageResult?.isPremium) {
      can(Action.Manage, 'notification');
      can(Action.Receive, 'notification');
      can(Action.Manage, 'integration');
      can(Action.Manage, 'cohost');
      can(Action.Create, CohostInvitation);
      can(Action.Manage, PageTipTier, { pageId: pageResult?.id });

      // TIP REPLY ACTIONS
      can(Action.Manage, TipReply, { 'tip.pageId': pageResult?.id } as any);
      can(Action.Manage, TipGoal, { pageId: pageResult?.id });
    }

    // OBS ACTIONS
    // Send obs message when streamer or cohost of the page is the user
    can(Action.SendObsMessage, Page, { userId: user.id });

    if (user.cohostPageId) {
      can(Action.SendObsMessage, Page, {
        id: user.cohostPageId,
      });
    }

    // PAGE SETTINGS
    // Update page settings but only can reset the obs sound.
    can(Action.Update, PageSetting);
    cannot(Action.Update, PageSetting, {
      key: PageSettingKey.OBS_SOUND,
      value: { $ne: null },
    });
    if (pageResult?.isPremium || isAdmin) can(Action.Update, PageSetting);

    // COHOST ACTIONS
    can(Action.Delete, CohostInvitation, {
      'page.userId': user.id,
    } as any);

    // TIPS ACTIONS
    can(Action.MakeTipPrivate, Page, { userId: user.id });
    // can(Action.MakeTipPublic, Page, { userId: user.id });
    // Only make private if cohost
    can(Action.MakeTipPrivate, Page, { id: user.cohostPageId });

    // SUPER DM ACTIONS
    can(Action.SendSuperDmMessage, SuperDm, { 'page.userId': user.id } as any);
    can(Action.ReadSuperDmMessages, SuperDm, { 'page.userId': user.id } as any);

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
