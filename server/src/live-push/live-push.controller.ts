import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { IsPublic } from 'src/shared/decorators/is-public.decorator';
import { LivePushService } from './live-push.service';
import { pushClientTracker } from './push-client-ip';
import { PushRegistrationDto } from './dtos/push-registration.dto';
import { PushAcknowledgementDto } from './dtos/push-acknowledgement.dto';

const bearerToken = (authorization?: string) =>
  authorization?.replace(/^Bearer /, '');

@Controller('live-streams/push')
@IsPublic()
@Throttle({
  default: { limit: 12, ttl: 60_000, getTracker: pushClientTracker },
})
export class LivePushController {
  constructor(private readonly service: LivePushService) {}

  @Get('key')
  key() {
    return this.service.publicKey();
  }

  @Put('subscriptions/:id')
  register(
    @Param('id', ParseUUIDPipe) id: string,
    @Headers('authorization') authorization: string,
    @Body() dto: PushRegistrationDto,
  ) {
    return this.service.register(id, bearerToken(authorization), dto);
  }

  @Delete('subscriptions/:id')
  unregister(
    @Param('id', ParseUUIDPipe) id: string,
    @Headers('authorization') authorization: string,
  ) {
    return this.service.unregister(id, bearerToken(authorization));
  }

  @Post('subscriptions/:id/ack')
  acknowledge(
    @Param('id', ParseUUIDPipe) id: string,
    @Headers('authorization') authorization: string,
    @Body() dto: PushAcknowledgementDto,
  ) {
    return this.service.acknowledge(id, bearerToken(authorization), dto.nonce);
  }

  @Post('subscriptions/:id/test')
  test(
    @Param('id', ParseUUIDPipe) id: string,
    @Headers('authorization') authorization: string,
  ) {
    return this.service.test(id, bearerToken(authorization));
  }
}
