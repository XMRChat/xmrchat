import { InjectQueue, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job, Queue } from 'bullmq';
import {
  PatronContactChannel,
  PatronMembershipStatus,
  PatronMessageStatus,
} from 'src/shared/constants';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { PatronContactEntity } from './patron-contact.entity';
import { PatronMembershipEntity } from './patron-membership.entity';
import { PatronMessageEntity } from './patron-message.entity';

@Processor('patron-messages')
export class PatronMessageProcessor extends WorkerHost {
  private readonly logger = new Logger(PatronMessageProcessor.name);

  constructor(
    @InjectRepository(PatronMessageEntity)
    private messageRepo: Repository<PatronMessageEntity>,
    @InjectRepository(PatronMembershipEntity)
    private membershipRepo: Repository<PatronMembershipEntity>,
    @InjectRepository(PatronContactEntity)
    private contactRepo: Repository<PatronContactEntity>,
    @InjectQueue('notifications-email') private emailQueue: Queue,
    @InjectQueue('notifications-signal') private signalQueue: Queue,
  ) {
    super();
  }

  async process(job: Job) {
    if (job.name !== 'send-patron-message') return;

    const messageId = job.data.messageId as number;
    if (!messageId) {
      this.logger.warn('Patron message job missing messageId');
      return;
    }

    const message = await this.messageRepo.findOne({
      where: { id: messageId },
      relations: { membershipLevels: true, page: true },
    });

    if (!message) {
      this.logger.warn(`Patron message ${messageId} not found`);
      return;
    }

    if (message.status !== PatronMessageStatus.SCHEDULED) {
      this.logger.warn(
        `Patron message ${messageId} is not scheduled (status=${message.status})`,
      );
      return;
    }

    const membershipWhere: FindOptionsWhere<PatronMembershipEntity> = {
      page: { id: message.pageId },
      status: PatronMembershipStatus.ACTIVE,
    };

    const levelIds = message.membershipLevels?.map((l) => l.id) ?? [];
    if (levelIds.length) {
      membershipWhere.membershipLevel = { id: In(levelIds) };
    }

    const memberships = await this.membershipRepo.find({
      where: membershipWhere,
    });

    if (memberships.length) {
      const patronIds = memberships.map((m) => m.patronId);
      const contacts = await this.contactRepo.find({
        where: {
          patron: { id: In(patronIds) },
          channel: In([
            PatronContactChannel.EMAIL,
            PatronContactChannel.SIGNAL,
          ]),
        },
      });

      const pageName = message.page?.name || message.page?.path;
      const signalText = `Message from ${pageName}:\n${message.body}`;

      for (const contact of contacts) {
        if (!contact.destination?.trim()) continue;

        if (contact.channel === PatronContactChannel.EMAIL) {
          await this.emailQueue.add('send-email', {
            to: contact.destination,
            options: {
              subject: `Message from ${pageName}`,
              template: 'patron-message.hbs',
              context: {
                pageName,
                body: message.body,
              },
            },
          });
        }

        if (contact.channel === PatronContactChannel.SIGNAL) {
          await this.signalQueue.add('send-message', {
            account: contact.destination,
            message: signalText,
          });
        }
      }
    }

    message.status = PatronMessageStatus.SENT;
    await this.messageRepo.save(message);
  }
}
