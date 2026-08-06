import { Payment } from '../payments/payment.entity';
import { Page } from '../pages/page.entity';
import { Swap } from '../swaps/swap.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  RelationId,
  OneToMany,
} from 'typeorm';
import { TipReply } from 'src/tip-replies/tip-reply.entity';
import { TipSourceEnum } from 'src/shared/constants';

@Entity({ name: 'tips' })
export class Tip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 2000, nullable: true })
  message: string;

  @Column({ type: 'boolean' })
  private: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  expiresAt: Date;

  @Column({ type: 'boolean', default: false })
  webhookDeleted: boolean;

  @Column({ nullable: true })
  source?: TipSourceEnum;

  @ManyToOne(() => Page, { onDelete: 'CASCADE' })
  @JoinColumn({ foreignKeyConstraintName: 'tips_page_id_fkey' })
  page: Page;

  @RelationId((t: Tip) => t.page)
  pageId: number;

  @OneToOne(() => Payment, (p: Payment) => p.tip)
  payment: Payment;

  @OneToOne(() => Swap, (s: Swap) => s.tip, { eager: true })
  swap: Swap;

  @RelationId((t: Tip) => t.swap)
  swapId: number;

  @OneToMany(() => TipReply, (t: TipReply) => t.tip)
  tipReplies: TipReply[];

  get clearedMessage() {
    return '';
  }
}
