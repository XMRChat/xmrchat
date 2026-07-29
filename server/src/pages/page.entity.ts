import { User } from '../users/user.entity';
import { File as FileEntity } from '../files/file.entity';
import { Payment } from '../payments/payment.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
  Unique,
  VirtualColumn,
} from 'typeorm';
import { Tier } from './tier.entity';
import { PageSetting } from '../page-settings/page-setting.entity';
import { Link } from '../links/link.entity';
import { Tip } from 'src/tips/tip.entity';
import { PageStatusEnum } from '../shared/constants';
import { PageRecipient } from 'src/page-recipients/page-recipient.entity';
import { LiveStream } from '../live-streams/live-stream.entity';
import { PageTipTier } from 'src/page-tip-tiers/page-tip-tier.entity';
import { TipGoal } from 'src/tip-goals/tip-goal.entity';

@Entity({ name: 'pages' })
@Unique(['path'])
export class Page {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column({
    type: 'enum',
    enum: PageStatusEnum,
    default: PageStatusEnum.ACTIVE,
  })
  status: PageStatusEnum;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  searchTerms: string;

  @Column()
  primaryAddress: string;

  @Column()
  secretViewKey: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  twitchChannel: string;

  @Column({ type: 'bigint', nullable: true })
  minTipAmount: number;

  // deprecated, use tipDisplayMode instead.
  @Column({ nullable: true })
  defaultTipAmountDisplay: string;

  @Column({ nullable: true })
  tipDisplayMode: string; // xmr or fiat

  @Column({ nullable: true })
  messageTipDisplayMode: string; // xmr or fiat

  @Column({ nullable: true, default: 'usd' })
  fiat: string;

  @Column('boolean', { default: true })
  isPublic: boolean;

  @Column({ type: 'boolean', default: false })
  isPremium: boolean;

  @Column({ type: 'integer', nullable: true })
  expirationMinutes: number;

  @OneToOne(() => FileEntity, { eager: true })
  @JoinColumn({ foreignKeyConstraintName: 'pages_cover_image_id_fkey' })
  coverImage: FileEntity;

  @OneToOne(() => FileEntity, { eager: true })
  @JoinColumn({ foreignKeyConstraintName: 'pages_logo_id_fkey' })
  logo: FileEntity;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: 'pages_user_id_fkey' })
  user: User;

  @RelationId((p: Page) => p.user)
  userId: number;

  @OneToOne(() => Payment, (p: Payment) => p.page, { eager: true })
  payment: Payment;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  createdAt: Date;

  @OneToMany(() => Tier, (t: Tier) => t.page, {
    cascade: true,
  })
  tiers: Tier[];

  @OneToMany(() => PageSetting, (p: PageSetting) => p.page)
  settings: PageSetting[];

  @OneToMany(() => Tip, (t: Tip) => t.page)
  tips: Tip[];

  @OneToMany(() => Link, (l) => l.page)
  links: Link[];

  @OneToMany(() => PageRecipient, (p: PageRecipient) => p.page, {
    cascade: true,
  })
  recipients: PageRecipient[];

  @OneToMany(() => LiveStream, (l: LiveStream) => l.page)
  liveStreams: LiveStream[];

  @OneToMany(() => PageTipTier, (p: PageTipTier) => p.page)
  pageTipTiers: PageTipTier[];

  @OneToMany(() => User, (u: User) => u.cohostPage)
  cohosts: User[];

  @OneToOne(() => TipGoal, (t: TipGoal) => t.page)
  tipGoal: TipGoal;

  totalTips: number | null;
  tipsCount: number | null;
}
