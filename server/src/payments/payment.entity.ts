import { Tip } from '../tips/tip.entity';
import { Page } from '../pages/page.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { SuperDm } from 'src/super-dms/super-dm.entity';
import { PatronMembershipEntity } from 'src/patrons/patron-membership.entity';

@Entity({ name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  eventId: string;

  @OneToOne(() => Tip, (t: Tip) => t.payment, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  tip?: Tip;

  @Column({ nullable: true })
  pageSlug?: string;

  @OneToOne(() => Page, (p: Page) => p.payment, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ foreignKeyConstraintName: 'payments_page_id_fkey' })
  page?: Page;

  @OneToOne(() => SuperDm, (s) => s.payment, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  superDm?: SuperDm;

  @ManyToOne(
    () => PatronMembershipEntity,
    (m: PatronMembershipEntity) => m.payments,
    {
      nullable: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ foreignKeyConstraintName: 'payments_membership_id_fkey' })
  membership?: PatronMembershipEntity;

  @RelationId((p: Payment) => p.membership)
  membershipId?: number;

  @Column({ type: 'varchar', length: 32 })
  amount: string;

  @Column({ type: 'varchar', length: 32, default: '0' })
  paidAmount: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  paidAt?: Date;

  isPaid() {
    return !!this.paidAt;
  }
}
