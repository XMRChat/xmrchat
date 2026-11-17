import { PatronContactChannel } from 'src/shared/constants';
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

@Entity({ name: 'patron_contacts' })
@Unique('UQ_patron_contacts_patron_channel', ['patron', 'channel'])
export class PatronContactEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PatronEntity, { onDelete: 'CASCADE', nullable: false })
  patron: PatronEntity;

  @RelationId((c: PatronContactEntity) => c.patron)
  patronId: string;

  @Column({ type: 'enum', enum: PatronContactChannel })
  channel: PatronContactChannel;

  @Column({ type: 'varchar' })
  destination: string;

  @Column({ type: 'boolean', default: false })
  enabled: boolean;

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @Column({ nullable: true })
  verificationCode: string;

  @Column({ type: 'timestamptz', nullable: true })
  verificationExpiresAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  get valid() {
    return this.enabled && this.verified && Boolean(this.destination);
  }
}
