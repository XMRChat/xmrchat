import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import {
  LivePushFanoutJob,
  LivePushJob,
  LivePushService,
} from './live-push.service';

@Processor('xmrpod-push')
export class LivePushProcessor extends WorkerHost {
  constructor(private livePushService: LivePushService) {
    super();
  }

  async process(job: Job<LivePushJob | LivePushFanoutJob>) {
    if (job.name === 'fanout')
      await this.livePushService.fanout(job.data as LivePushFanoutJob);
    else await this.livePushService.send(job.data as LivePushJob);
  }
}
