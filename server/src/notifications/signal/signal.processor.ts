import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { SignalService } from './signal.service';
import { Job } from 'bullmq';
import { NotificationFailureService } from '../notification-failure.service';

@Processor('notifications-signal')
export class SignalProcessor extends WorkerHost {
  constructor(
    private readonly signalService: SignalService,
    private readonly notificationFailureService: NotificationFailureService,
  ) {
    super();
  }

  async process(job: Job) {
    const data = job.data;

    if (job.name === 'send-message') {
      await this.signalService.sendMessage(data.account, data.message);
    }
  }

  @OnWorkerEvent('failed')
  async handleError(job: Job, error: Error) {
    await this.notificationFailureService.sendFailureNotification(
      job,
      error,
      'Signal',
    );
  }
}
