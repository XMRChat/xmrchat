import { Expose, Transform, Type } from 'class-transformer';
import { PageTipTierDto } from 'src/page-tip-tiers/dtos/page-tip-tier.dto';
import { PaymentDto } from 'src/payments/dtos/payment.dto';
import { TipSourceEnum } from 'src/shared/constants';
import { SwapDto } from 'src/swaps/dtos/swap.dto';
import { TipReplyDto } from 'src/tip-replies/dtos/tip-reply.dto';

export class BaseTipDto {
  @Expose()
  id: number;

  @Expose()
  @Transform(({ value, obj, options }) => {
    if (options.groups?.includes('streamer')) return value;
    if (obj.private) return '';
    return value;
  })
  name: string;

  @Expose()
  @Transform(({ value, obj, options }) => {
    if (options.groups?.includes('streamer')) return value;
    if (obj.private) return '';
    return value;
  })
  message: string;

  @Expose()
  private: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  expiresAt: Date;

  @Expose()
  source?: TipSourceEnum;

  @Expose()
  @Type(() => PaymentDto)
  payment: PaymentDto;

  @Expose()
  @Type(() => SwapDto)
  swap: SwapDto;

  @Expose()
  @Type(() => PageTipTierDto)
  pageTipTier: PageTipTierDto;

  @Expose()
  @Type(() => TipReplyDto)
  tipReplies: TipReplyDto[];
}
