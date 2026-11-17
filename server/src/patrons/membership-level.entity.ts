import { Page } from 'src/pages/page.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'membership_levels' })
export class MembershipLevelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Page, { onDelete: 'CASCADE', nullable: false })
  page: Page;

  @RelationId((m: MembershipLevelEntity) => m.page)
  pageId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'bigint' })
  price: string;

  @Column({ type: 'integer' })
  duration: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
