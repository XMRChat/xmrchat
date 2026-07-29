import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { KickService } from './kick.service';
import { KickTokenService } from './kick-token.service';

@Module({
  imports: [HttpModule.register({})],
  providers: [KickService, KickTokenService],
  exports: [KickService, KickTokenService],
})
export class KickModule {}
