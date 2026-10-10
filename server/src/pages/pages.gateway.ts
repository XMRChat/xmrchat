import { forwardRef, Inject, Logger, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { WsAuthGuard } from 'src/auth/guards/ws-auth.guard';
import { Payment } from 'src/payments/payment.entity';
import { Tip } from 'src/tips/tip.entity';
import { PagesService } from './pages.service';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { TipMessageService } from 'src/tip-message/tip-message.service';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Action } from 'src/shared/constants';
import { serializer } from 'src/shared/interceptors/serialize.interceptor';
import { TipDto } from 'src/tips/dtos/tip.dto';
import { PageTipTier } from 'src/page-tip-tiers/page-tip-tier.entity';
import { getTipTier } from 'src/shared/utils';

/**
 * @description Gateway for pages.
 * @emits obsTip - When a tip is added to the OBS page.
 * @emits obsTipRemove - When a tip is removed from the OBS page.
 * @emits payment - When a payment is made for a page.
 * @emits tip - When a tip is added to the page.
 */
@WebSocketGateway({ namespace: '/pages', cors: { origin: true } })
export class PagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger(PagesGateway.name);

  constructor(
    private casl: CaslAbilityFactory,
    @Inject(forwardRef(() => PagesService)) private pagesService: PagesService,
    @InjectRepository(Tip) private tipsRepo: Repository<Tip>,
    @Inject(CACHE_MANAGER) private cache: Cache,
    private tipMessageService: TipMessageService,
  ) {}

  @WebSocketServer()
  server: Namespace;

  async handleConnection(client: Socket) {
    // This is used to trigger the connection recovery
    client.emit('dummyEvent');

    const slug = client.handshake.auth.slug;

    if (!slug) return;

    this.logger.log(
      `Client ${client.id.slice(0, 8)}... connected to page - Slug: ${slug}`,
    );

    await client.join(`page-${slug}`);
  }

  handleDisconnect() {}

  @SubscribeMessage('join')
  async handleJoin(
    @MessageBody() body: { slug: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { slug } = body;
    if (!slug) {
      this.logger.warn(
        'Client connected but there is no slug. Not joining room.',
      );
      return;
    }

    await client.join(`page-${slug}`);
    this.logger.log(
      `Client ${client.id.slice(0, 8)}... joined room - Slug: ${slug}`,
    );

    const activeTipIds = await this.getActiveTipIds(slug);
    if (activeTipIds.length) {
      const tips = await this.tipsRepo.find({
        where: { id: In(activeTipIds) },
        relations: { page: true, payment: true },
      });

      const payloads = await Promise.all(
        tips.map((tip) => this.generateEventPayload({ tip, autoRemove: true })),
      );

      return payloads;
    }
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('addTipToObs')
  async handleAddTipToObs(
    @MessageBody() body: { slug: string; tipId: number },
    @ConnectedSocket() client: Socket,
  ) {
    const { slug, tipId } = body;
    const user = (client as any).user;

    const page = await this.pagesService.findByPath(slug);
    if (!page) return { error: 'Page not found' };

    const ability = await this.casl.createForUser(user);

    if (!ability.can(Action.SendObsMessage, page))
      return { error: 'Unauthorized' };

    let tip = await this.tipsRepo.findOne({
      where: { id: tipId },
      relations: { page: true, payment: true },
    });

    if (!tip) return { error: 'Tip not found' };

    if (tip.page.id !== page.id) return { error: 'Tip not found' };

    const {
      tip: t,
      message,
      autoRemove,
    } = await this.generateEventPayload({
      tip,
      pageTipTiers: page.pageTipTiers,
    });

    this.server
      .to(`page-${slug}`)
      .emit('obsTip', { tip: t, message, autoRemove });

    await this.addTipToObsCache(slug, tip.id);

    this.logger.log(`Send tip ${tipId} on OBS ${slug}`);

    return { message: 'Tip is added on the OBS page.' };
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('removeTipFromObs')
  async handleRemoveTipFromObs(
    @MessageBody() body: { slug: string; tipId: number },
    @ConnectedSocket() client: Socket,
  ) {
    const { slug, tipId } = body;
    const user = (client as any).user;

    const page = await this.pagesService.findByPath(slug);
    if (!page) return { error: 'Page not found' };

    const ability = await this.casl.createForUser(user);
    if (!ability.can(Action.SendObsMessage, page))
      return { error: 'Unauthorized' };

    this.server.to(`page-${slug}`).emit('obsTipRemove', { tipId });
    await this.removeTipFromObsCache(slug, tipId);
    return { message: 'Tip is removed from the OBS page.' };
  }

  notifyPagePayment(slug: string, payment: Payment) {
    return this.server.to(`page-${slug}`).emit('payment', payment);
  }

  async notifyNewTip(slug: string, tipId: number) {
    const tip = await this.tipsRepo.findOne({
      where: { id: tipId },
      relations: { page: { pageTipTiers: { sound: true } }, payment: true },
    });

    if (!tip) return;

    const eventPayload = await this.generateEventPayload({
      tip,
      autoRemove: true,
      pageTipTiers: tip.page.pageTipTiers,
    });

    this.server.to(`page-${slug}`).emit('obsTip', eventPayload);
    this.server.to(`page-${slug}`).emit('tip', eventPayload);
  }

  async addTipToObsCache(slug: string, tipId: number) {
    const activeTips =
      (await this.cache.get<number[]>(`obs-tips:${slug}`)) || [];
    await this.cache.set(`obs-tips:${slug}`, [...activeTips, tipId], {
      ttl: 60 * 60 * 24,
    } as any);
  }

  async removeTipFromObsCache(slug: string, tipId: number) {
    const activeTips =
      (await this.cache.get<number[]>(`obs-tips:${slug}`)) || [];
    await this.cache.set(
      `obs-tips:${slug}`,
      activeTips.filter((id) => id !== tipId),
      { ttl: 60 * 60 * 24 } as any,
    );
  }

  async getActiveTipIds(slug: string) {
    return (await this.cache.get<number[]>(`obs-tips:${slug}`)) || [];
  }

  async generateEventPayload({
    tip,
    autoRemove = false,
    pageTipTiers,
  }: {
    tip: Tip;
    autoRemove?: boolean;
    pageTipTiers?: PageTipTier[];
  }) {
    const tier = getTipTier(tip.payment.amount, pageTipTiers);

    const message = await this.tipMessageService.generateMessage(
      tip.id,
      tip.page.id,
      { censor: false },
    );

    tip = Object.assign({}, tip, { pageTipTier: tier });

    const t = serializer(TipDto, tip);

    return { tip: t, message, autoRemove };
  }
}
