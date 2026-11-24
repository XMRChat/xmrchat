import { Page } from 'src/pages/page.entity';
import { PatronMessageStatus } from 'src/shared/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { MembershipLevelEntity } from './membership-level.entity';

@Entity({ name: 'patron_messages' })
export class PatronMessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Page, { onDelete: 'CASCADE', nullable: false })
  page: Page;

  @RelationId((m: PatronMessageEntity) => m.page)
  pageId: number;

  @Column({ type: 'text' })
  body: string;

  @Column({ type: 'timestamptz' })
  sendDatetime: Date;

  @Column({
    type: 'varchar',
    default: PatronMessageStatus.SCHEDULED,
  })
  status: PatronMessageStatus;

  /** Empty = all membership levels on the page; otherwise only these levels. */
  @ManyToMany(() => MembershipLevelEntity)
  @JoinTable({
    name: 'patron_message_membership_levels',
    joinColumn: { name: 'patron_message_id' },
    inverseJoinColumn: { name: 'membership_level_id' },
  })
  membershipLevels: MembershipLevelEntity[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
