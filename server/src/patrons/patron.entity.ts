import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PatronMembershipEntity } from './patron-membership.entity';

@Entity({ name: 'patrons' })
export class PatronEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 64 })
  keyHash: string;

  @Column({ length: 4 })
  keyHint: string;

  @OneToMany(() => PatronMembershipEntity, (m) => m.patron)
  memberships: PatronMembershipEntity[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
