import {
  Controller,
  Post,
  Param,
  Body,
  UnauthorizedException,
  Logger,
  Get,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IsPublic } from 'src/shared/decorators/is-public.decorator';
import { PagesService } from 'src/pages/pages.service';
import { PaymentsService } from 'src/payments/payments.service';
import { TipsGateway } from 'src/tips/tips.gateway';
import { TipsService } from 'src/tips/tips.service';
import { LwsWebhookEvent } from 'src/shared/types';
import { SwapsService } from 'src/swaps/swaps.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { SuperDmsService } from 'src/super-dms/super-dms.service';
import { SuperDmsGateway } from 'src/super-dms/super-dms.gateway';

@Controller('webhooks')
export class WebhooksController {
  private logger = new Logger(WebhooksController.name);

  constructor(
    private configService: ConfigService,
    private paymentsService: PaymentsService,
    private tipsService: TipsService,
    private pagesService: PagesService,
    private tipsGateway: TipsGateway,
    private swapsService: SwapsService,
    private superDmsService: SuperDmsService,
    private superDmsGateway: SuperDmsGateway,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post('/:token')
  @IsPublic()
  async handleWebhook(
    @Param('token') token: string,
    @Body() body: LwsWebhookEvent,
  ) {
    if (token !== this.configService.get('LWS_WEBHOOK_TOKEN'))
      throw new UnauthorizedException();

    const eventType = body.event;
    const amount = body.tx_info.amount;

    this.logger.log(
      `Webhook call - Confirmations: ${body.confirmations} - Event Id: ${body.event_id} - TX Hash: ${body.tx_info.tx_hash}`,
    );

    if (eventType !== 'tx-confirmation') {
      this.logger.warn('Event different from tx-confirmation');
      return;
    }

    // ? For transactions with confirmations other than 0 check if it has already been used.
    if (body.confirmations !== 0) {
      const ignore = await this.cacheManager.get(
        `transaction:${body.tx_info.tx_hash}`,
      );
      if (ignore) {
        this.logger.log(
          `LWS webhook call with confirmation ${body.confirmations} and is already used.`,
        );
        return;
      }
    }

    await this.cacheManager.set(
      `transaction:${body.tx_info.tx_hash}`,
      'ignore',
      {
        ttl: 60 * 15,
      } as any,
    );

    const payment = await this.paymentsService.findOneByEventId(body.event_id);

    if (!payment) {
      this.logger.warn(`Payment not found with event id: ${body.event_id}`);
      return;
    }

    if (payment.pageSlug)
      return this.pagesService.handlePagePayment(payment, amount);
    else if (payment.tip)
      return this.tipsService.handleTipPayment(payment, amount);
    else if (payment.superDm)
      return this.superDmsService.handleSuperDmPayment(payment, amount);
  }

  @IsPublic()
  @Post(`/trocator/:token`)
  async trocadorTransaction(@Body() body, @Param('token') token: string) {
    this.logger.log('Trocador webhook call');

    if (token !== this.configService.get('TROCADOR_WEBHOOK_TOKEN'))
      throw new UnauthorizedException();

    const swap = await this.swapsService.findOneBySwapId(body.trade_id);

    if (!swap) throw new NotFoundException('Swap is not found.');

    const newSwap = await this.swapsService.handleTrocadorStatusChange(
      body,
      swap.id,
    );

    this.logger.log(
      `Sending swap status change event - tip ${swap.tipId} - status ${newSwap.status}`,
    );

    if (swap.tipId)
      this.tipsGateway.notifySwapStatusChange(swap.tipId, newSwap);
    if (swap.superDmId)
      this.superDmsGateway.notifySwapStatusChange(swap.superDmId, newSwap);

    if (!swap.tipId && !swap.superDmId) {
      this.logger.warn('Swap has no tip or super dm');
    }

    return swap;
  }
}
