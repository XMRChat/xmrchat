import { BullBoardModule } from '@bull-board/nestjs';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

@Module({
  imports: [
    BullModule.registerQueue(
      { name: 'notifications-email' },
      { name: 'notifications-simplex' },
      { name: 'notifications-signal' },
      { name: 'live-stream' },
      { name: 'xmrpod-push' },
      { name: 'notifications-daily-summary' },
      { name: 'link-verification-validation' }
    ),

    BullBoardModule.forFeature({
      name: 'notifications-email',
      adapter: BullMQAdapter,
    }),
    BullBoardModule.forFeature({
      name: 'notifications-simplex',
      adapter: BullMQAdapter,
    }),
    BullBoardModule.forFeature({
      name: 'notifications-signal',
      adapter: BullMQAdapter,
    }),
    BullBoardModule.forFeature({
      name: 'live-stream',
      adapter: BullMQAdapter,
    }),
    BullBoardModule.forFeature({
      name: 'notifications-daily-summary',
      adapter: BullMQAdapter,
    }),
    BullBoardModule.forFeature({
      name: 'link-verification-validation',
      adapter: BullMQAdapter,
    }),
  ],
  exports: [BullModule],
})
export class QueuesModule { }
