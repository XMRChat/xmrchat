import { Page } from 'src/pages/page.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { PatronEntity } from './patron.entity';

@Entity({ name: 'patron_page_profiles' })
@Unique('UQ_patron_page_profiles_patron_page', ['patron', 'page'])
export class PatronPageProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PatronEntity, { onDelete: 'CASCADE', nullable: false })
  patron: PatronEntity;

  @RelationId((p: PatronPageProfileEntity) => p.patron)
  patronId: string;

  @ManyToOne(() => Page, { onDelete: 'CASCADE', nullable: false })
  page: Page;

  @RelationId((p: PatronPageProfileEntity) => p.page)
  pageId: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
