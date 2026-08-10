import { Module } from '@nestjs/common';
import { TwitchService } from './twitch.service';
import { HttpModule } from '@nestjs/axios';
import { TwitchTokenService } from './twitch-token.service';
import { QueuesModule } from 'src/queues/queues.module';

@Module({
  imports: [HttpModule.register({}), QueuesModule],
  providers: [TwitchService, TwitchTokenService],
  exports: [TwitchService, TwitchTokenService],
})
export class TwitchModule {}
