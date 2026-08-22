import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoneroUtils } from 'monero-ts';
import { Page } from 'src/pages/page.entity';
import { PricesService } from 'src/prices/prices.service';
import { FiatEnum, TipDisplayMode } from 'src/shared/constants';
import { clearMessage } from 'src/shared/utils';
import { Tip } from 'src/tips/tip.entity';
import { Repository } from 'typeorm';
import Handlebars from 'handlebars';
import { FIAT_VALUES } from 'src/shared/constants/fiat';

@Injectable()
export class TipMessageService {
  constructor(
    @InjectRepository(Tip) private tipsRepo: Repository<Tip>,
    @InjectRepository(Page) private pagesRepo: Repository<Page>,
    private pricesService: PricesService,
  ) {}

  private privateTemplate = `Private tipped {{value}}`;
  private template = `{{name}} tipped {{value}} {{#if message}}: {{message}} {{/if}}`;

  async generateMessage(tipId: number, pageId: number) {
    const tip = await this.tipsRepo.findOne({
      where: { id: tipId },
      relations: { payment: true },
    });
    const message = clearMessage(tip.message);
    const page = await this.pagesRepo.findOneBy({ id: pageId });

    const fiatPrice = await this.pricesService.getMoneroPrice(
      page.fiat as FiatEnum,
    );

    const xmrValue = MoneroUtils.atomicUnitsToXmr(tip.payment.amount);
    const xmrValueDisplay = `${xmrValue} XMR`;

    const fiatValue = `${FIAT_VALUES[page.fiat].symbol}${(xmrValue * fiatPrice).toFixed(2)}`;

    const value =
      page.messageTipDisplayMode === TipDisplayMode.XMR
        ? xmrValueDisplay
        : fiatValue;

    const isPrivate = tip.private;

    const template = isPrivate ? this.privateTemplate : this.template;
    const hbTemplate = Handlebars.compile(template, { noEscape: true });

    const result = hbTemplate({
      name: tip.name,
      value,
      message: message,
    });

    return result;
  }
}
