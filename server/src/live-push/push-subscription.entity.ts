import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'xmrpod_push_subscriptions' })
export class PushSubscription {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  tokenHash: string;

  @Column({ type: 'text' })
  endpoint: string;

  @Column()
  p256dh: string;

  @Column()
  auth: string;

  @Column({ type: 'uuid', nullable: true })
  challenge?: string;

  @Column({ type: 'timestamptz', nullable: true })
  verifiedAt?: Date;

  @Column({ type: 'timestamptz' })
  expiresAt: Date;
}
