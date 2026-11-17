import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
  constructor(@InjectRepository(Payment) private repo: Repository<Payment>) {}

  async createPayment(payload: {
    amount: string;
    pageSlug?: string;
    tip?: { id: number };
    superDm?: { id: string };
    membership?: { id: number };
    eventId: string;
  }) {
    const created = this.repo.create(payload);
    return this.repo.save(created);
  }

  async findOneByEventId(eventId: string) {
    if (!eventId) return;
    return this.repo.findOne({
      where: { eventId },
      relations: { tip: true, superDm: true, membership: true },
    });
  }

  async findOneById(id: number) {
    if (!id) return;
    return this.repo.findOneBy({ id });
  }

  async updatePaidAmount(
    id: number,
    newAmount: number | string, // amount in xmr units
    minAmount?: number | string, // amount in xmr units
    allowThreshold: number = 0,
  ) {
    const payment = await this.findOneById(id);
    if (!payment) throw new BadRequestException('Payment is not found');

    const amount = Number(payment.amount);
    const newPaidAmount = Number(payment.paidAmount) + Number(newAmount);

    const minimumAmountAsPaid = minAmount
      ? Number(minAmount)
      : amount - allowThreshold * amount;

    const newPayment = Object.assign(payment, {
      paidAmount: `${newPaidAmount}`,
      paidAt: newPaidAmount >= minimumAmountAsPaid ? new Date() : null,
    });

    return this.repo.save(newPayment);
  }
}
