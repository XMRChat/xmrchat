import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PeertubeService } from './peertube.service';

@Module({
  imports: [HttpModule.register({})],
  providers: [PeertubeService],
  exports: [PeertubeService],
})
export class PeertubeModule {}
