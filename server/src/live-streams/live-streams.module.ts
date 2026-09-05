import { Module } from '@nestjs/common';
import { LiveStreamsService } from './live-streams.service';
import { LiveStreamsController } from './live-streams.controller';
import { YoutubeModule } from 'src/integrations/youtube/youtube.module';
import { YoutubeProvider } from './providers/youtube.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from 'src/links/link.entity';
import { LiveStream } from './live-stream.entity';
import { LinksModule } from 'src/links/links.module';
import { LiveStreamProcessor } from './live-stream.processor';
import { TwitchProvider } from './providers/twitch.provider';
import { Page } from 'src/pages/page.entity';
import { TwitchModule } from 'src/integrations/twitch/twitch.module';
import { RumbleModule } from 'src/integrations/rumble/rumble.module';
import { RumbleProvider } from './providers/rumble.provider';
import { QueuesModule } from 'src/queues/queues.module';
import { PeertubeModule } from 'src/integrations/peertube/peertube.module';
import { PeertubeProvider } from './providers/peertube.provider';
import { KickModule } from 'src/integrations/kick/kick.module';
import { KickProvider } from './providers/kick.provider';
import { XProvider } from './providers/x.provider';

@Module({
  imports: [
    YoutubeModule,
    TwitchModule,
    KickModule,
    RumbleModule,
    PeertubeModule,
    LinksModule,
    TypeOrmModule.forFeature([LiveStream, Link, Page]),
    QueuesModule,
  ],
  controllers: [LiveStreamsController],
  providers: [
    LiveStreamsService,
    YoutubeProvider,
    TwitchProvider,
    KickProvider,
    XProvider,
    RumbleProvider,
    PeertubeProvider,
    LiveStreamProcessor,
  ],
  exports: [LiveStreamsService],
})
export class LiveStreamsModule {}
