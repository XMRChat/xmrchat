import { Expose, Type } from 'class-transformer';
import { SwapDto } from 'src/swaps/dtos/swap.dto';
import { BaseTipDto } from './base-tip.dto';
import { PageRecipientShareDto } from 'src/page-recipients/dtos/recipient.dto';

export class TipDto extends BaseTipDto {}

export class TipDtoRO {
  @Expose()
  amount: string;

  @Expose()
  paymentAddress: string;

  @Expose()
  @Type(() => TipDto)
  tip: TipDto;

  @Expose()
  id: number;

  @Expose()
  @Type(() => SwapDto)
  swap: SwapDto;

  @Expose()
  @Type(() => PageRecipientShareDto)
  recipients: PageRecipientShareDto[];

  @Expose()
  url?: string;
}
