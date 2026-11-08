import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'xmrpod_live_push_states' })
export class LivePushState {
  @PrimaryColumn()
  pageId: number;

  @Column({ type: 'uuid' })
  sessionId: string;

  @Column({ type: 'jsonb', default: {} })
  identities: Record<string, string>;

  @Column({ type: 'timestamptz' })
  startedAt: Date;

  @Column({ type: 'timestamptz' })
  lastSeenAt: Date;
}
