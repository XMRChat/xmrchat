import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { SimplexService } from './simplex.service';
import { Job } from 'bullmq';
import { NotificationFailureService } from '../notification-failure.service';

@Processor('notifications-simplex')
export class SimplexProcessor extends WorkerHost {
  constructor(
    private readonly simplexService: SimplexService,
    private readonly notificationFailureService: NotificationFailureService,
  ) {
    super();
  }

  async process(job: Job) {
    const data = job.data;

    if (job.name === 'send-message') {
      await this.simplexService.sendMessage(data.contactId, data.message);
    }
  }

  @OnWorkerEvent('failed')
  async handleError(job: Job, error: Error) {
    await this.notificationFailureService.sendFailureNotification(
      job,
      error,
      'Simplex',
    );
  }
}
