import { Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { TwitchTokenService } from 'src/integrations/twitch/twitch-token.service';
import { LinkVerificationsService } from 'src/link-verifications/link-verifications.service';
import { LiveStreamsService } from 'src/live-streams/live-streams.service';
import { NotificationTestsService } from 'src/notifications/notification-tests.service';

@Command({
  name: 'config',
  arguments: '<config>',
  description: 'Updates configs',
})
export class ConfigCommand extends CommandRunner {
  private logger = new Logger(ConfigCommand.name);

  constructor(
    private twitchTokenService: TwitchTokenService,
    private liveStreamsService: LiveStreamsService,
    private linkVerificationsService: LinkVerificationsService,
    private notificationTestsService: NotificationTestsService,
  ) {
    super();
  }

  async run(
    passedParams: string[],
    options?: Record<string, any>,
  ): Promise<void> {
    const config = passedParams[0];

    if (config === 'get-twitch-token') {
      await this.updateTwitchToken();
      return;
    }
    if (config === 'validate-twitch-token') {
      await this.validateTwitchToken();
      return;
    }
    if (config === 'refresh-twitch-token') {
      await this.refreshTwitchToken();
      return;
    }
    if (config === 'update-live-streams') {
      await this.updateLiveStreams();
      return;
    }

    if (config === 'update-youtube-live-streams') {
      await this.updateYoutubeLiveStreams();
      return;
    }

    if (config === 'validate-link-verifications') {
      await this.validateLinkVerifications();
      return;
    }

    if (config === 'test-simplex') {
      await this.testSimplex();
      return;
    }

    this.logger.error(`Parameter is invalid: ${config}`);
  }

  async updateTwitchToken() {
    this.logger.log('updating twitch token');
    const token = await this.twitchTokenService.getAndSaveClientToken();
    console.log(token);
  }
  async validateTwitchToken() {
    this.logger.log('verifying twitch token');
    const token = await this.twitchTokenService.validateClientToken();
    console.log(token);
  }
  async refreshTwitchToken() {
    this.logger.log('refreshing twitch token');
    await this.twitchTokenService.refreshToken();
  }

  async updateLiveStreams() {
    this.logger.log('updating live streams');
    await this.liveStreamsService.getAndUpdateLiveStreams();
    this.logger.log('live streams updated');
  }

  async updateYoutubeLiveStreams() {
    this.logger.log('updating youtube live streams');
    await this.liveStreamsService.getYoutubeLiveStreams();
  }

  async validateLinkVerifications() {
    this.logger.log('validating link verifications');
    await this.linkVerificationsService.validateAll();
  }

  async testSimplex() {
    this.logger.log('Testing Simplex');
    await this.notificationTestsService.testSimplex();
  }
}
