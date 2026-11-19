import { Page } from 'src/pages/page.entity';
import { Payment } from 'src/payments/payment.entity';
import { PatronMembershipStatus } from 'src/shared/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { MembershipLevelEntity } from './membership-level.entity';
import { PatronEntity } from './patron.entity';

@Entity({ name: 'patron_memberships' })
@Unique('UQ_patron_memberships_patron_page', ['patron', 'page'])
export class PatronMembershipEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PatronEntity, { onDelete: 'CASCADE', nullable: false })
  patron: PatronEntity;

  @RelationId((m: PatronMembershipEntity) => m.patron)
  patronId: string;

  @ManyToOne(() => Page, { onDelete: 'CASCADE', nullable: false })
  page: Page;

  @RelationId((m: PatronMembershipEntity) => m.page)
  pageId: number;

  @ManyToOne(() => MembershipLevelEntity, { nullable: false })
  membershipLevel: MembershipLevelEntity;

  @RelationId((m: PatronMembershipEntity) => m.membershipLevel)
  membershipLevelId: number;

  @Column({ default: PatronMembershipStatus.PENDING })
  status: PatronMembershipStatus;

  @Column({ type: 'timestamptz' })
  durationStart: Date;

  @Column({ type: 'timestamptz' })
  durationEnd: Date;

  @OneToMany(() => Payment, (p: Payment) => p.membership)
  payments: Payment[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
