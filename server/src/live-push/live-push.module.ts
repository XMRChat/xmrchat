import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueuesModule } from 'src/queues/queues.module';
import { LivePushService } from './live-push.service';
import { LivePushController } from './live-push.controller';
import { LivePushProcessor } from './live-push.processor';
import { PushSubscription } from './push-subscription.entity';
import { LivePushState } from './live-push-state.entity';
import { LivePushEvent } from './live-push-event.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PushSubscription, LivePushState, LivePushEvent]),
    QueuesModule,
  ],
  controllers: [LivePushController],
  providers: [LivePushService, LivePushProcessor],
  exports: [LivePushService],
})
export class LivePushModule {}
