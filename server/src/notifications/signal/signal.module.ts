import { Module } from '@nestjs/common';
import { SignalService } from './signal.service';
import { SignalModule as SignalIntegrationModule } from 'src/integrations/signal/signal.module';
import { SignalProcessor } from './signal.processor';
import { NotificationFailureService } from '../notification-failure.service';
import { QueuesModule } from 'src/queues/queues.module';

@Module({
  imports: [SignalIntegrationModule, QueuesModule],
  providers: [SignalService, SignalProcessor, NotificationFailureService],
})
export class SignalModule {}
