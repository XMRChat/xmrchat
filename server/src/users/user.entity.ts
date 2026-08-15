import { Page } from 'src/pages/page.entity';
import { RolesEnum } from '../shared/constants';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: RolesEnum,
    array: true,
    default: [RolesEnum.STREAMER],
  })
  roles: RolesEnum[];

  @Column({ default: 'en', length: 2 })
  language: string;

  @ManyToOne(() => Page, { nullable: true })
  cohostPage: Page;

  @RelationId((u: User) => u.cohostPage)
  cohostPageId: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Column('boolean', { default: false })
  isEmailVerified: boolean;

  @Column({ default: 0 })
  tokenVersion: number;
}
