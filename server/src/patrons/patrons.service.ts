import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
import { ILike, In, MoreThan, Repository } from 'typeorm';
import { CreateMembershipDto } from './dtos/create-membership.dto';
import { CreateMembershipLevelDto } from './dtos/create-membership-level.dto';
import { UpdateMembershipLevelDto } from './dtos/update-membership-level.dto';
import { MembershipLevelEntity } from './membership-level.entity';
import { PatronContactEntity } from './patron-contact.entity';
import { PatronEntity } from './patron.entity';
import { generatePatronKey } from './patron-key';
import { PatronMembershipEntity } from './patron-membership.entity';
import { PatronPageProfileEntity } from './patron-page-profile.entity';
import { PatronsGateway } from './patrons.gateway';

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

  async findActiveMembers(page: Page) {
    const memberships = await this.membershipRepo.find({
      where: {
        page: { id: page.id },
        status: PatronMembershipStatus.ACTIVE,
        durationEnd: MoreThan(new Date()),
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
  private async validateMemberName(page: Page, name: string) {
    const profiles = await this.profileRepo.find({
      where: { page: { id: page.id }, name: ILike(name) },
    });
    if (!profiles.length) return;

    const inUse = await this.membershipRepo.exists({
      where: {
        page: { id: page.id },
        patron: { id: In(profiles.map((p) => p.patronId)) },
        status: PatronMembershipStatus.ACTIVE,
        durationEnd: MoreThan(new Date()),
      },
    });
    if (inUse)
      throw new BadRequestException(
        'This name is already used by an active member.',
      );
  }

  async createMembership(pageSlug: string, dto: CreateMembershipDto) {
    const page = await this.pagesService.findByPath(pageSlug);
    if (!page) throw new NotFoundException('Page is not found');

    const level = await this.levelRepo.findOne({
      where: { id: dto.membershipLevelId, page: { id: page.id } },
    });
    if (!level) throw new NotFoundException('Membership level is not found');

    const name = dto.name.trim();
    if (name.length < 2)
      throw new BadRequestException('Name must be at least 2 characters.');
    await this.validateMemberName(page, name);

    const amountInXmr = MoneroUtils.atomicUnitsToXmr(level.price);

    const { eventId, integratedAddress } =
      await this.paymentFlowService.create({
        amount: String(amountInXmr),
        page,
      });

    const key = generatePatronKey();
    const now = new Date();

    const membership = await this.membershipRepo.manager.transaction(
      async (manager) => {
        const patron = await manager.save(
          manager.create(PatronEntity, {
            keyHash: key.keyHash,
            keyHint: key.keyHint,
          }),
        );

        await manager.save(
          manager.create(PatronPageProfileEntity, {
            patron: { id: patron.id },
            page: { id: page.id },
            name,
          }),
        );

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

        // Duration is set when the payment is received.
        return manager.save(
          manager.create(PatronMembershipEntity, {
            patron: { id: patron.id },
            page: { id: page.id },
            plan: { id: level.id },
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
      mnemonic: key.mnemonic,
    };
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
      relations: { plan: true },
    });

    if (!membership) {
      this.logger.warn(`Membership is not found with id: ${membershipRef.id}`);
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
    const stillActive =
      membership.status === PatronMembershipStatus.ACTIVE &&
      membership.durationEnd > now;

    const base = stillActive ? membership.durationEnd : now;
    const durationEnd = new Date(base);
    durationEnd.setUTCDate(durationEnd.getUTCDate() + membership.plan.duration);

    membership.status = PatronMembershipStatus.ACTIVE;
    if (!stillActive) {
      membership.durationStart = now;
    }
    membership.durationEnd = durationEnd;

    await this.membershipRepo.save(membership);

    this.logger.log(
      `Extended membership ${membership.id} until ${membership.durationEnd.toISOString()}`,
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
