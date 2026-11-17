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

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
