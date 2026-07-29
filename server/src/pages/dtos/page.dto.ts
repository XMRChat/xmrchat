import { Expose, Transform, Type } from 'class-transformer';
import { FileDto } from 'src/files/dtos/file.dto';
import { TierDto } from './tier/tier.dto';
import { MoneroUtils } from 'monero-ts';
import { LinkDto } from 'src/links/dto/link.dto';
import { LiveStreamDto } from 'src/live-streams/dtos/live-stream.dto';
import { PageTipTierDto } from 'src/page-tip-tiers/dtos/page-tip-tier.dto';
import { TipGoalDto } from 'src/tip-goals/dtos/tip-goal.dto';

export class PageDto {
  @Expose()
  id: number;

  @Expose()
  path: string;

  @Expose()
  name: string;

  @Expose()
  @Type(() => FileDto)
  logo: FileDto;

  @Expose()
  @Type(() => FileDto)
  coverImage: FileDto;

  @Expose()
  description: string;

  @Expose()
  @Type(() => TierDto)
  tiers: TierDto[];

  @Expose()
  twitchChannel: string;

  @Expose()
  fiat: string;

  @Expose()
  tipDisplayMode: string;

  @Expose()
  messageTipDisplayMode: string;

  @Expose()
  expirationMinutes: number;

  @Expose()
  @Transform(
    ({ value }) => value && MoneroUtils.atomicUnitsToXmr(value).toString(),
  )
  minTipAmount: string;

  @Expose()
  @Type(() => LinkDto)
  links: LinkDto[];

  @Expose()
  @Type(() => LiveStreamDto)
  liveStreams: LiveStreamDto[];

  @Expose()
  @Type(() => PageTipTierDto)
  pageTipTiers: PageTipTierDto[];

  @Expose()
  bio: string;

  @Expose()
  @Type(() => TipGoalDto)
  tipGoal: TipGoalDto;

  @Expose()
  ability?: any;
}
