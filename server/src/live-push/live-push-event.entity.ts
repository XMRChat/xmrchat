import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

export type LivePushMessage = {
  type: 'live' | 'verify' | 'test';
  sessionId?: string;
  path?: string;
  startedAt?: string;
  detectedAt?: string;
  nonce?: string;
};

@Entity({ name: 'xmrpod_live_push_events' })
@Index('IDX_xmrpod_live_push_events_pending', ['expiresAt'], {
  where: '"dispatched" = false',
})
export class LivePushEvent {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'jsonb' })
  message: LivePushMessage;

  @Column({ type: 'boolean', default: false })
  dispatched: boolean;

  @Column({ type: 'timestamptz' })
  expiresAt: Date;
}
