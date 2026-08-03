import { Module } from '@nestjs/common';
import { SimplexService } from './simplex.service';
import { SimplexModule as SimplexIntegrationModule } from 'src/integrations/simplex/simplex.module';
import { SimplexProcessor } from './simplex.processor';
import { NotificationFailureService } from '../notification-failure.service';
import { QueuesModule } from 'src/queues/queues.module';

@Module({
  imports: [SimplexIntegrationModule, QueuesModule],
  providers: [SimplexService, SimplexProcessor, NotificationFailureService],
})
export class SimplexModule {}
