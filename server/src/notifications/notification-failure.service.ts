import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Job, Queue } from 'bullmq';

@Injectable()
export class NotificationFailureService {
  constructor(
    @InjectQueue('notifications-email') private emailQueue: Queue,
    private configService: ConfigService,
  ) {}

  async sendFailureNotification(job: Job, error: Error, provider: string) {
    const emails =
      this.configService.get('FAILED_REPORT_RECEPIENTS') ||
      this.configService.get('PAGE_REPORT_RECEPIENTS');
    const emailList = emails.split(' ') || [];
    if (!emailList.length) return;

    await this.emailQueue.add('send-email', {
      to: emailList,
      options: {
        subject: `${provider} failed to send`,
        html: `${provider} failed to send. ${JSON.stringify(job.data)}, Error: ${error.message}`,
      },
    });
  }
}
