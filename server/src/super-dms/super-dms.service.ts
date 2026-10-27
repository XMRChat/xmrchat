import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PageSettingsService } from 'src/page-settings/page-settings.service';
import { PagesService } from 'src/pages/pages.service';
import { CreateSuperDmDto } from './dto/create-super-dm.dto';
import { ConfigService } from '@nestjs/config';
import {
  Action,
  PageSettingKey,
  SuperDmMessageSenderType,
} from 'src/shared/constants';
import { MoneroUtils } from 'monero-ts';
import { PaymentFlowService } from 'src/payment-flow/payment-flow.service';
import { InjectRepository } from '@nestjs/typeorm';
import { SuperDm } from './super-dm.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { PaymentsService } from 'src/payments/payments.service';
import { Swap } from 'src/swaps/swap.entity';
import { SwapsService } from 'src/swaps/swaps.service';
import { PageRecipientsService } from 'src/page-recipients/page-recipients.service';
import { Payment } from 'src/payments/payment.entity';
import { SuperDmsGateway } from './super-dms.gateway';
import { LwsService } from 'src/lws/lws.service';
import { User } from 'src/users/user.entity';
import { EndSuperDmDto } from './dto/end-super-dm.dto';
import { verifySignature } from 'src/shared/utils/encryption';
import { SuperDmSettingsService } from './super-dm-settings.service';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class SuperDmsService {
  private logger = new Logger(SuperDmsService.name);

  constructor(
    private pageSettingsService: PageSettingsService,
    private pagesService: PagesService,
    private configService: ConfigService,
    private paymentFlowService: PaymentFlowService,
    private paymentsService: PaymentsService,
    private swapsService: SwapsService,
    private pageRecipientsService: PageRecipientsService,
    private superDmsGateway: SuperDmsGateway,
    private lwsService: LwsService,
    private superDmSettingsService: SuperDmSettingsService,
    private notificationsService: NotificationsService,
    @InjectRepository(SuperDm) private repo: Repository<SuperDm>,
  ) {}

  async findAll(user: User) {
    const page = await this.pagesService.findMyPage(user);
    if (!page) throw new NotFoundException('Page is not found.');

    const superDms = await this.repo.find({
      where: { page: { id: page.id }, payment: { paidAt: Not(IsNull()) } },
      relations: { payment: true, messages: true },
      order: { createdAt: 'DESC' },
    });

    return superDms;
  }

  async findById(id: string) {
    if (!id) throw new BadRequestException('SuperDM id is required.');

    const superDm = await this.repo.findOne({
      where: { id },
      relations: { payment: true, messages: true, page: true },
      order: { messages: { createdAt: 'ASC' } },
    });

    if (!superDm) throw new NotFoundException('SuperDM is not found.');

    if (!superDm.payment.isPaid())
      throw new NotFoundException('SuperDM is not completed.');

    return superDm;
  }

  async createSuperDm(dto: CreateSuperDmDto) {
    const page = await this.pagesService.findByPath(dto.path);
    if (!page) throw new NotFoundException('Page is not found.');

    const isActive = await this.superDmSettingsService.isSuperDmActive(page);
    if (!isActive)
      throw new BadRequestException('SuperDM is not active for this page.');

    // if (!page.isPremium)
    //   throw new BadRequestException('SuperDM is not available for this page.');

    await this.validateMinSuperDmAmount(page.path, dto.amount);

    const { baseSwap, eventId, inputCoin, integratedAddress } =
      await this.paymentFlowService.create({
        amount: String(MoneroUtils.atomicUnitsToXmr(dto.amount)),
        page,
        coinId: dto.coinId,
      });

    const created = this.repo.create({
      name: dto.name,
      publicKey: dto.publicKey,
      expiresAt:
        baseSwap?.details?.expiresAt || new Date(Date.now() + 60 * 60 * 1000),
      page: { id: page.id },
    });
    const superDm = await this.repo.save(created);

    await this.paymentsService.createPayment({
      amount: dto.amount,
      eventId: eventId,
      superDm: { id: superDm.id },
    });

    // Save swap
    let swap: Swap | undefined;
    if (baseSwap) {
      swap = await this.swapsService.saveSwap({
        baseSwap,
        coin: inputCoin,
        superDm,
      });
    }

    const { recipients, url } =
      await this.pageRecipientsService.handleRecipientsAndAmounts({
        pageId: page.id,
        swapId: swap?.id,
        amount: MoneroUtils.atomicUnitsToXmr(dto.amount),
        integratedAddress,
      });

    return {
      amount: dto.amount,
      paymentAddress: integratedAddress,
      superDm,
      swap,
      recipients,
      url,
    };
  }

  async validateMinSuperDmAmount(pagePath: string, dtoAmount: string) {
    const configMin = this.configService.get<string>('MIN_TIP_AMOUNT');
    const pageMin = await this.pageSettingsService.getSettingValue<string>(
      pagePath,
      PageSettingKey.SUPER_DM_MIN_AMOUNT,
    );
    const min = pageMin || configMin;
    const minBig = BigInt(min);
    const dtoBig = BigInt(dtoAmount);

    if (dtoBig < minBig)
      throw new BadRequestException(
        `Amount must be greater than ${MoneroUtils.atomicUnitsToXmr(min)} XMR.`,
      );
  }

  async handleSuperDmPayment(payment: Payment, amount: number) {
    const superDm = payment.superDm;

    if (!superDm) {
      this.logger.warn(
        `SuperDM is not found on the payment with event id of ${payment.eventId}`,
      );
      return;
    }

    const page = await this.pagesService.findById(superDm.pageId);

    if (!page) {
      this.logger.warn(`Page is not found on SuperDM with id: ${superDm.id}`);
      return;
    }
    const amountInXmr = MoneroUtils.atomicUnitsToXmr(amount.toString());
    const pageAmount = await this.pageRecipientsService.getPageAmount({
      pageId: page.id,
      swapId: superDm.swapId,
      amount: amountInXmr,
    });

    const pageUnitAmount = MoneroUtils.xmrToAtomicUnits(pageAmount);

    const savedPayment = await this.paymentsService.updatePaidAmount(
      payment.id,
      amount,
      pageUnitAmount ? pageUnitAmount.toString() : undefined,
      // tip.swap ? 0.1 : 0, // threshold - accepts payment if paid amount has 0.1 less.
    );

    if (!savedPayment.isPaid()) {
      this.logger.log(
        `SuperDM transaction is received but is lower than expected amount ${savedPayment.amount} - Current paid amount: ${savedPayment.paidAmount} - isPaid: ${savedPayment.isPaid()}`,
      );
      this.logger.log(
        `Sending partial SuperDM socket event. SuperDM Id ${superDm.id}`,
      );

      this.superDmsGateway.notifyPayment(superDm.id, savedPayment);
      return;
    }

    this.logger.log(`Sending SuperDM socket event. SuperDM Id ${superDm.id}`);
    this.superDmsGateway.notifyPayment(superDm.id, savedPayment);

    await this.notificationsService.handleNewSuperDm(page.id, superDm.id);

    try {
      await this.lwsService.deleteWebhook(payment.eventId);
    } catch (error) {}
  }

  async endSuperDm(superDmId: string, dto: EndSuperDmDto) {
    const superDm = await this.findById(superDmId);

    const endedByType = dto.endedByType;

    let publicKeyArmored: string | undefined;

    if (endedByType === SuperDmMessageSenderType.CREATOR) {
      publicKeyArmored = await this.pageSettingsService.getSettingValue(
        superDm.page.path,
        PageSettingKey.SUPER_DM_PUBLIC_KEY,
      );
    } else {
      publicKeyArmored = superDm.publicKey;
    }

    if (!publicKeyArmored)
      throw new BadRequestException('Public key is not found.');

    const messageToVerify = JSON.stringify({
      date: dto.date,
    });

    try {
      await verifySignature({
        message: messageToVerify,
        signature: dto.signature,
        publicKeyArmored,
        date: dto.date,
      });
    } catch (error) {
      throw new BadRequestException('Signature is not valid.');
    }

    if (new Date(dto.date) < new Date(Date.now() - 60 * 1000)) {
      throw new BadRequestException('Message is too old.');
    }

    // both viewer and creator have at least on message

    const messages = superDm.messages;
    const viewerMessages = messages.filter(
      (m) => m.senderType === SuperDmMessageSenderType.VIEWER,
    );
    const creatorMessages = messages.filter(
      (m) => m.senderType === SuperDmMessageSenderType.CREATOR,
    );

    if (!viewerMessages.length || !creatorMessages.length) {
      throw new BadRequestException(
        'Both viewer and creator must have at least one message.',
      );
    }

    superDm.endedAt = new Date();
    superDm.endedByType = endedByType;
    await this.repo.save(superDm);

    return { message: 'SuperDM ended successfully' };
  }
}
