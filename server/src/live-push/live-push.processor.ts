import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { LivePushJob, LivePushService } from './live-push.service';

@Processor('xmrpod-push')
export class LivePushProcessor extends WorkerHost {
  constructor(private livePushService: LivePushService) {
    super();
  }

  async process(job: Job<LivePushJob>) {
    await this.livePushService.send(job.data);
  }
}
