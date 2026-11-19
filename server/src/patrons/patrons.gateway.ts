import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { Payment } from 'src/payments/payment.entity';

/**
 * @description Gateway for patron membership payments.
 * @emits patron-membership-payment - When a payment is made for a membership.
 **/
@WebSocketGateway({
  namespace: '/patrons',
})
export class PatronsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger(PatronsGateway.name);

  @WebSocketServer()
  server: Namespace;

  async handleConnection(client: Socket) {
    const membershipId = client.handshake.query.membershipId;

    // This is used to trigger the connection recovery
    client.emit('dummyEvent');

    await client.join(`membership-${membershipId}`);
  }

  handleDisconnect() {}

  notifyPayment(membershipId: number, payment: Payment) {
    return this.server
      .to(`membership-${membershipId}`)
      .emit('patron-membership-payment', payment);
  }
}
