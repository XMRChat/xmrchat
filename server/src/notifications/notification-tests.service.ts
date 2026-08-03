import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationTestsService {
  constructor(
    @InjectQueue('notifications-email') private emailQueue: Queue,
    @InjectQueue('notifications-simplex') private simplexQueue: Queue,
    @InjectQueue('notifications-signal') private signalQueue: Queue,
    private configService: ConfigService,
  ) {}

  async testSignal() {
    const username = this.configService.get('SIGNAL_CLI_USERNAME');
    const phoneNumber = this.configService.get('SIGNAL_CLI_PHONE_NUMBER');
    await this.signalQueue.add('send-message', {
      account: username || phoneNumber,
      message: 'Test message for signal',
    });
  }

  async testSimplex() {
    await this.simplexQueue.add('send-message', {
      contactId: 1,
      message: 'Test message for simplex',
    });
  }
}
