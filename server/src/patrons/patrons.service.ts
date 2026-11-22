import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { MoneroUtils } from 'monero-ts';
import { LwsService } from 'src/lws/lws.service';
import { Page } from 'src/pages/page.entity';
import { PagesService } from 'src/pages/pages.service';
import { Payment } from 'src/payments/payment.entity';
import { PaymentsService } from 'src/payments/payments.service';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import {
  Action,
  PatronContactChannel,
  PatronMembershipStatus,
} from 'src/shared/constants';
import { PageRecipientsService } from 'src/page-recipients/page-recipients.service';
import { PaymentFlowService } from 'src/payment-flow/payment-flow.service';
import { User } from 'src/users/user.entity';
import { ILike, In, LessThanOrEqual, Repository } from 'typeorm';
import { CreateMembershipDto } from './dtos/create-membership.dto';
import { CreateMembershipLevelDto } from './dtos/create-membership-level.dto';
import { UpdateMembershipLevelDto } from './dtos/update-membership-level.dto';
import { UpdatePatronContactsDto } from './dtos/update-patron-contacts.dto';
import { MembershipLevelEntity } from './membership-level.entity';
import { PatronContactEntity } from './patron-contact.entity';
import { PatronEntity } from './patron.entity';
import { generatePatronKey, hashPatronMnemonic } from './patron-key';
import { PatronMembershipEntity } from './patron-membership.entity';
import { PatronPageProfileEntity } from './patron-page-profile.entity';
import { PatronsGateway } from './patrons.gateway';

type PatronJwtPayload = { patronId: string; type: 'patron' };

@Injectable()
export class PatronsService {
  private logger = new Logger(PatronsService.name);

  private MAX_MEMBERSHIP_LEVELS = 5;

  private PAYMENT_EXPIRES_IN_MS = 60 * 60 * 1000;

  constructor(
    @InjectRepository(PatronMembershipEntity)
    private membershipRepo: Repository<PatronMembershipEntity>,
    @InjectRepository(MembershipLevelEntity)
    private levelRepo: Repository<MembershipLevelEntity>,
    @InjectRepository(PatronPageProfileEntity)
    private profileRepo: Repository<PatronPageProfileEntity>,
    @InjectRepository(PatronEntity)
    private patronRepo: Repository<PatronEntity>,
    @InjectRepository(PatronContactEntity)
    private contactRepo: Repository<PatronContactEntity>,
    private jwtService: JwtService,
    private paymentsService: PaymentsService,
    private paymentFlowService: PaymentFlowService,
    private pageRecipientsService: PageRecipientsService,
    private patronsGateway: PatronsGateway,
    private lwsService: LwsService,
    private pagesService: PagesService,
    private configService: ConfigService,
    private casl: CaslAbilityFactory,
  ) {}

  async findAllMembershipLevels(user: User) {
    const page = await this.pagesService.findMyPage(user);
    if (!page) throw new NotFoundException('Page is not found');

    return this.levelRepo.find({
      where: { page: { id: page.id } },
      order: { price: 'ASC' },
    });
  }

  async findMembershipLevelsByPage(page: Page) {
    return this.levelRepo.find({
      where: { page: { id: page.id } },
      order: { price: 'ASC' },
    });
  }

  private async attachProfiles(
    memberships: PatronMembershipEntity[],
    pageId: number,
  ) {
    if (!memberships.length) return memberships;

    const profiles = await this.profileRepo.find({
      where: {
        page: { id: pageId },
        patron: { id: In(memberships.map((m) => m.patronId)) },
      },
    });

    for (const membership of memberships) {
      (
        membership as PatronMembershipEntity & {
          profile?: PatronPageProfileEntity;
        }
      ).profile = profiles.find((p) => p.patronId === membership.patronId);
    }

    return memberships;
  }

  async findActiveMemberships(user: User) {
    const page = await this.pagesService.findMyPage(user);
    if (!page) throw new NotFoundException('Page is not found');

    const memberships = await this.membershipRepo.find({
      where: {
        page: { id: page.id },
        status: PatronMembershipStatus.ACTIVE,
      },
      relations: { membershipLevel: true },
      order: { durationStart: 'ASC' },
    });

    return this.attachProfiles(memberships, page.id);
  }

  // Marks paid memberships whose duration has ended
  @Cron(CronExpression.EVERY_5_MINUTES)
  async expireMemberships() {
    const result = await this.membershipRepo.update(
      {
        status: PatronMembershipStatus.ACTIVE,
        durationEnd: LessThanOrEqual(new Date()),
      },
      { status: PatronMembershipStatus.EXPIRED },
    );

    if (result.affected) {
      this.logger.log(`Expired ${result.affected} patron memberships.`);
    }
  }

  async findExpiredMemberships(user: User) {
    const page = await this.pagesService.findMyPage(user);
    if (!page) throw new NotFoundException('Page is not found');

    const memberships = await this.membershipRepo.find({
      where: {
        page: { id: page.id },
        status: PatronMembershipStatus.EXPIRED,
      },
      relations: { membershipLevel: true },
      order: { durationEnd: 'DESC' },
    });

    return this.attachProfiles(memberships, page.id);
  }

  // Memberships of a logged in patron on one page (excludes unpaid pending).
  async findMyMembershipsOnPage(patronId: string, page: Page) {
    const memberships = await this.membershipRepo.find({
      where: {
        patron: { id: patronId },
        page: { id: page.id },
      },
      relations: { membershipLevel: true },
      order: { durationEnd: 'DESC' },
    });

    const paid = memberships.filter(
      (m) => m.status !== PatronMembershipStatus.PENDING,
    );
    return this.attachProfiles(paid, page.id);
  }

  async findActiveMembers(page: Page) {
    const memberships = await this.membershipRepo.find({
      where: {
        page: { id: page.id },
        status: PatronMembershipStatus.ACTIVE,
      },
      order: { durationStart: 'ASC' },
    });
    if (!memberships.length) return [];

    const profiles = await this.profileRepo.find({
      where: {
        page: { id: page.id },
        patron: { id: In(memberships.map((m) => m.patronId)) },
      },
    });

    // Keep the order of the memberships (oldest first).
    return memberships
      .map((m) => profiles.find((p) => p.patronId === m.patronId))
      .filter((p): p is PatronPageProfileEntity => Boolean(p));
  }

  private getContacts(dto: CreateMembershipDto) {
    return [
      { channel: PatronContactChannel.EMAIL, destination: dto.email },
      { channel: PatronContactChannel.SIGNAL, destination: dto.signal },
      { channel: PatronContactChannel.SIMPLEX, destination: dto.simplex },
    ]
      .map((c) => ({ ...c, destination: c.destination?.trim() }))
      .filter((c) => c.destination);
  }

  // A name can not be used if an active member of the page is using it.
  // The patron that already has a membership on this page can keep their name.
  private async validateMemberName(
    page: Page,
    name: string,
    excludePatronId?: string,
  ) {
    const profiles = (
      await this.profileRepo.find({
        where: { page: { id: page.id }, name: ILike(name) },
      })
    ).filter((p) => p.patronId !== excludePatronId);
    if (!profiles.length) return;

    const inUse = await this.membershipRepo.exists({
      where: {
        page: { id: page.id },
        patron: { id: In(profiles.map((p) => p.patronId)) },
        status: PatronMembershipStatus.ACTIVE,
      },
    });
    if (inUse)
      throw new BadRequestException(
        'This name is already used by an active member.',
      );
  }

  // When `existingPatron` is set, reuse that patron (no new recovery key or
  // contacts). An existing membership on this page is updated to the new
  // level; remaining days are applied when the payment is received.
  async createMembership(
    pageSlug: string,
    dto: CreateMembershipDto,
    existingPatron?: PatronEntity,
  ) {
    const page = await this.pagesService.findByPath(pageSlug);
    if (!page) throw new NotFoundException('Page is not found');

    const level = await this.levelRepo.findOne({
      where: { id: dto.membershipLevelId, page: { id: page.id } },
    });
    if (!level) throw new NotFoundException('Membership level is not found');

    const name = dto.name.trim();
    if (name.length < 2)
      throw new BadRequestException('Name must be at least 2 characters.');
    await this.validateMemberName(page, name, existingPatron?.id);

    const amountInXmr = MoneroUtils.atomicUnitsToXmr(level.price);

    const { eventId, integratedAddress } = await this.paymentFlowService.create(
      {
        amount: String(amountInXmr),
        page,
      },
    );

    // The recovery key is only generated for a new patron.
    const key = existingPatron ? undefined : generatePatronKey();
    const now = new Date();

    const membership = await this.membershipRepo.manager.transaction(
      async (manager) => {
        // Use existing Patron or create new one.
        const patron =
          existingPatron ??
          (await manager.save(
            manager.create(PatronEntity, {
              keyHash: key.keyHash,
              keyHint: key.keyHint,
            }),
          ));

        // A patron has one profile (name) per page.
        const profile = await manager.findOne(PatronPageProfileEntity, {
          where: { patron: { id: patron.id }, page: { id: page.id } },
        });
        if (profile) {
          if (profile.name !== name) {
            profile.name = name;
            await manager.save(profile);
          }
        } else {
          await manager.save(
            manager.create(PatronPageProfileEntity, {
              patron: { id: patron.id },
              page: { id: page.id },
              name,
            }),
          );
        }

        // Contacts are only set when creating a new patron. Existing patrons
        // change them later on a separate route.
        if (!existingPatron) {
          const contacts = this.getContacts(dto).map((c) =>
            manager.create(PatronContactEntity, {
              patron: { id: patron.id },
              channel: c.channel,
              destination: c.destination,
              enabled: true,
              verified: false,
            }),
          );
          if (contacts.length) await manager.save(contacts);
        }

        // One membership per page. Level / status / duration change only when
        // the payment is received (the intended level is stored on the payment).
        const current = await manager.findOne(PatronMembershipEntity, {
          where: { patron: { id: patron.id }, page: { id: page.id } },
        });
        if (current) return current;

        return manager.save(
          manager.create(PatronMembershipEntity, {
            patron: { id: patron.id },
            page: { id: page.id },
            membershipLevel: { id: level.id },
            name: level.name,
            description: level.description,
            status: PatronMembershipStatus.PENDING,
            durationStart: now,
            durationEnd: now,
          }),
        );
      },
    );

    await this.paymentsService.createPayment({
      amount: level.price,
      eventId,
      membership: { id: membership.id },
      membershipLevel: { id: level.id },
    });

    const { recipients, url } =
      await this.pageRecipientsService.handleRecipientsAndAmounts({
        pageId: page.id,
        amount: amountInXmr,
        integratedAddress,
      });

    return {
      amount: level.price,
      paymentAddress: integratedAddress,
      membership,
      recipients,
      url,
      expiresAt: new Date(now.getTime() + this.PAYMENT_EXPIRES_IN_MS),
      mnemonic: key?.mnemonic,
    };
  }

  private get patronTokenSecret() {
    return `${this.configService.get<string>('JWT_SECRET')}:patron`;
  }

  // Returns the patron of a valid patron token, null if the token is not valid.
  async validatePatronToken(token?: unknown): Promise<PatronEntity | null> {
    if (!token || typeof token !== 'string') return null;

    let payload: PatronJwtPayload;
    try {
      payload = this.jwtService.verify<PatronJwtPayload>(token, {
        secret: this.patronTokenSecret,
      });
    } catch {
      return null;
    }
    if (payload?.type !== 'patron' || !payload.patronId) return null;

    return this.patronRepo.findOne({ where: { id: payload.patronId } });
  }

  private async findPatron(id: string) {
    const patron = await this.patronRepo.findOne({
      where: { id },
      relations: {
        memberships: { page: { logo: true }, membershipLevel: true },
        contacts: true,
      },
      order: { memberships: { durationEnd: 'DESC' } },
    });
    if (!patron) return null;

    // Pending memberships are not paid yet.
    patron.memberships = patron.memberships.filter(
      (m) => m.status !== PatronMembershipStatus.PENDING,
    );

    const profiles = await this.profileRepo.find({
      where: { patron: { id } },
    });
    for (const membership of patron.memberships) {
      (
        membership as PatronMembershipEntity & {
          profile?: PatronPageProfileEntity;
        }
      ).profile = profiles.find((p) => p.pageId === membership.page.id);
    }

    return patron;
  }

  async login(mnemonic: string) {
    const keyHash = hashPatronMnemonic(mnemonic);
    if (!keyHash) throw new UnauthorizedException('Invalid recovery phrase.');

    const patron = await this.patronRepo.findOne({ where: { keyHash } });
    if (!patron) throw new UnauthorizedException('Patron is not found.');

    const payload: PatronJwtPayload = { patronId: patron.id, type: 'patron' };
    const token = this.jwtService.sign(payload, {
      secret: this.patronTokenSecret,
      expiresIn: '30d',
    });

    const patronResult = await this.findPatron(patron.id);

    return { token, patron: patronResult };
  }

  async getPatron(id: string) {
    const patron = await this.findPatron(id);
    if (!patron) throw new UnauthorizedException('Patron is not found.');

    return patron;
  }

  // Upserts email / signal / simplex. Empty values remove that channel.
  // Changing a destination resets verification on that contact.
  async updateContacts(patronId: string, dto: UpdatePatronContactsDto) {
    const desired = [
      { channel: PatronContactChannel.EMAIL, destination: dto.email },
      { channel: PatronContactChannel.SIGNAL, destination: dto.signal },
      { channel: PatronContactChannel.SIMPLEX, destination: dto.simplex },
    ].map((c) => ({
      channel: c.channel,
      destination: c.destination?.trim() || '',
    }));

    const existing = await this.contactRepo.find({
      where: { patron: { id: patronId } },
    });

    for (const item of desired) {
      const current = existing.find((c) => c.channel === item.channel);

      if (!item.destination) {
        if (current) await this.contactRepo.remove(current);
        continue;
      }

      if (current) {
        if (current.destination !== item.destination) {
          current.destination = item.destination;
          current.verified = false;
          current.verificationCode = null;
          current.verificationExpiresAt = null;
        }
        current.enabled = true;
        await this.contactRepo.save(current);
      } else {
        await this.contactRepo.save(
          this.contactRepo.create({
            patron: { id: patronId },
            channel: item.channel,
            destination: item.destination,
            enabled: true,
            verified: false,
          }),
        );
      }
    }

    return this.getPatron(patronId);
  }

  async isPatronActive(page: Page) {
    const count = await this.levelRepo.count({
      where: { page: { id: page.id } },
    });
    return count > 0;
  }

  async findMembershipLevelById(id: number) {
    if (!id) return null;
    const level = await this.levelRepo.findOne({ where: { id } });
    if (!level) throw new NotFoundException('Membership level is not found');
    return level;
  }

  private validateMembershipLevelPrice(price: string) {
    const configMin = this.configService.get<string>('MIN_TIP_AMOUNT');
    if (BigInt(price) < BigInt(configMin))
      throw new BadRequestException(
        `Price must be more than or equal to ${MoneroUtils.atomicUnitsToXmr(configMin)} XMR.`,
      );
  }

  async updateMembershipLevel(
    id: number,
    dto: UpdateMembershipLevelDto,
    user: User,
  ) {
    const level = await this.levelRepo.findOne({ where: { id } });
    if (!level) throw new NotFoundException('Membership level is not found');

    const ability = await this.casl.createForUser(user);
    if (!ability.can(Action.Update, level))
      throw new UnauthorizedException(
        'You are not authorized to update a membership level.',
      );

    this.validateMembershipLevelPrice(dto.price);

    level.name = dto.name;
    level.description = dto.description ?? '';
    level.price = dto.price;
    level.duration = dto.duration;

    return this.levelRepo.save(level);
  }

  async createMembershipLevel(dto: CreateMembershipLevelDto, user: User) {
    const page = await this.pagesService.findMyPage(user);
    if (!page) throw new NotFoundException('Page is not found');

    this.validateMembershipLevelPrice(dto.price);

    const count = await this.levelRepo.count({
      where: { page: { id: page.id } },
    });
    if (count >= this.MAX_MEMBERSHIP_LEVELS)
      throw new BadRequestException(
        `You have reached the maximum number of membership levels (${this.MAX_MEMBERSHIP_LEVELS}).`,
      );

    const created = this.levelRepo.create({
      name: dto.name,
      description: dto.description ?? '',
      price: dto.price,
      duration: dto.duration,
      page: { id: page.id },
    });

    return this.levelRepo.save(created);
  }

  async handleMembershipPayment(payment: Payment, amount: number) {
    const membershipRef = payment.membership;

    if (!membershipRef) {
      this.logger.warn(
        `Membership is not found on the payment with event id of ${payment.eventId}`,
      );
      return;
    }

    const membership = await this.membershipRepo.findOne({
      where: { id: membershipRef.id },
      relations: { membershipLevel: true },
    });

    if (!membership) {
      this.logger.warn(`Membership is not found with id: ${membershipRef.id}`);
      return;
    }

    // Prefer the level stored on the payment (renewal); fall back to the one
    // already on the membership (first purchase).
    const level =
      payment.membershipLevel ??
      (payment.membershipLevelId
        ? await this.levelRepo.findOne({
            where: { id: payment.membershipLevelId },
          })
        : null) ??
      membership.membershipLevel;

    if (!level) {
      this.logger.warn(
        `Membership level is not found for payment ${payment.eventId}`,
      );
      return;
    }

    const amountInXmr = MoneroUtils.atomicUnitsToXmr(amount.toString());
    const pageAmount = await this.pageRecipientsService.getPageAmount({
      pageId: membership.pageId,
      amount: amountInXmr,
    });
    const pageUnitAmount = MoneroUtils.xmrToAtomicUnits(pageAmount);

    const savedPayment = await this.paymentsService.updatePaidAmount(
      payment.id,
      amount,
      pageUnitAmount ? pageUnitAmount.toString() : undefined,
    );

    if (!savedPayment.isPaid()) {
      this.logger.log(
        `Membership transaction is received but is lower than expected amount ${savedPayment.amount} - Current paid amount: ${savedPayment.paidAmount} - isPaid: ${savedPayment.isPaid()}`,
      );
      this.logger.log(
        `Sending partial membership socket event. Membership Id ${membership.id}`,
      );
      this.patronsGateway.notifyPayment(membership.id, savedPayment);
      return;
    }

    const now = new Date();
    // Remaining days are carried over: the purchased level's duration is added
    // on top of the current end date when the membership is still active.
    const remaining = membership.status === PatronMembershipStatus.ACTIVE;
    const base = remaining ? membership.durationEnd : now;
    const durationEnd = new Date(base);
    durationEnd.setUTCDate(durationEnd.getUTCDate() + level.duration);

    membership.membershipLevel = level;
    membership.name = level.name;
    membership.description = level.description;
    membership.status = PatronMembershipStatus.ACTIVE;
    if (!remaining) {
      membership.durationStart = now;
    }
    membership.durationEnd = durationEnd;

    await this.membershipRepo.save(membership);

    this.logger.log(
      `Activated membership ${membership.id} (level ${level.id}) until ${membership.durationEnd.toISOString()}`,
    );
    this.logger.log(
      `Sending membership socket event. Membership Id ${membership.id}`,
    );
    this.patronsGateway.notifyPayment(membership.id, savedPayment);

    try {
      await this.lwsService.deleteWebhook(payment.eventId);
    } catch (error) {}
  }
}
