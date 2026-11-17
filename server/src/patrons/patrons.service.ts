import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LwsService } from 'src/lws/lws.service';
import { Payment } from 'src/payments/payment.entity';
import { PaymentsService } from 'src/payments/payments.service';
import { PatronMembershipStatus } from 'src/shared/constants';
import { Repository } from 'typeorm';
import { PatronMembershipEntity } from './patron-membership.entity';

@Injectable()
export class PatronsService {
  private logger = new Logger(PatronsService.name);

  constructor(
    @InjectRepository(PatronMembershipEntity)
    private membershipRepo: Repository<PatronMembershipEntity>,
    private paymentsService: PaymentsService,
    private lwsService: LwsService,
  ) {}

  async handleMembershipPayment(payment: Payment, amount: number) {
    const membershipRef = payment.membership;

    if (!membershipRef) {
      this.logger.warn(
        `Membership is not found on the payment with event id of ${payment.eventId}`,
      );
      return;
    }

    const membership = await this.membershipRepo.findOne({
      where: { id: membershipRef.id },
      relations: { plan: true },
    });

    if (!membership) {
      this.logger.warn(`Membership is not found with id: ${membershipRef.id}`);
      return;
    }

    const savedPayment = await this.paymentsService.updatePaidAmount(
      payment.id,
      amount,
    );

    if (!savedPayment.isPaid()) {
      this.logger.log(
        `Membership transaction is received but is lower than expected amount ${savedPayment.amount} - Current paid amount: ${savedPayment.paidAmount} - isPaid: ${savedPayment.isPaid()}`,
      );
      return;
    }

    const now = new Date();
    const stillActive =
      membership.status === PatronMembershipStatus.ACTIVE &&
      membership.durationEnd > now;

    const base = stillActive ? membership.durationEnd : now;
    const durationEnd = new Date(base);
    durationEnd.setUTCDate(durationEnd.getUTCDate() + membership.plan.duration);

    membership.status = PatronMembershipStatus.ACTIVE;
    if (!stillActive) {
      membership.durationStart = now;
    }
    membership.durationEnd = durationEnd;

    await this.membershipRepo.save(membership);

    this.logger.log(
      `Extended membership ${membership.id} until ${membership.durationEnd.toISOString()}`,
    );

    try {
      await this.lwsService.deleteWebhook(payment.eventId);
    } catch (error) {}
  }
}
