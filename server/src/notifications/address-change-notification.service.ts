import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Cache } from 'cache-manager';

type SavedAddresses = {
  primaryAddress: string;
  address: string;
};

const CACHE_KEY = 'wallet-addresses';

@Injectable()
export class AddressChangeNotificationService implements OnModuleInit {
  private logger = new Logger(AddressChangeNotificationService.name);

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
    @InjectQueue('notifications-email') private emailQueue: Queue,
  ) {}

  async onModuleInit() {
    if (this.configService.get('ADDRESS_CHANGE_EMAIL_ACTIVE') !== 'true')
      return;
    await this.checkAndNotifyAddressChange();
  }

  async checkAndNotifyAddressChange() {
    const addresses: SavedAddresses = {
      primaryAddress:
        this.configService.get('ADMIN_MONERO_PRIMARY_ADDRESS') ?? '',
      address: this.configService.get('XMRCHAT_WALLET_ADDRESS') ?? '',
    };

    const saved = await this.cacheManager.get<SavedAddresses>(CACHE_KEY);

    if (!saved?.primaryAddress || !saved?.address) {
      await this.notify(
        'Website addresses saved',
        [
          'No saved website addresses were found.',
          'These addresses were saved.',
          `ADMIN_MONERO_PRIMARY_ADDRESS: ${addresses.primaryAddress || '(empty)'}`,
          `XMRCHAT_WALLET_ADDRESS: ${addresses.address || '(empty)'}`,
        ].join('\n'),
      );
      await this.cacheManager.set(CACHE_KEY, addresses);
      return;
    }

    const primaryChanged = saved.primaryAddress !== addresses.primaryAddress;
    const walletChanged = saved.address !== addresses.address;

    if (!primaryChanged && !walletChanged) return;

    const lines = [];

    if (primaryChanged) {
      lines.push(
        `ADMIN_MONERO_PRIMARY_ADDRESS: ${saved.primaryAddress} -> ${addresses.primaryAddress || '(empty)'}`,
      );
    }

    if (walletChanged) {
      lines.push(
        `XMRCHAT_WALLET_ADDRESS: ${saved.address} -> ${addresses.address || '(empty)'}`,
      );
    }

    await this.notify('Website addresses changed', lines.join('\n'));
    await this.cacheManager.set(CACHE_KEY, addresses);
  }

  private async notify(subject: string, text: string) {
    const emails =
      this.configService.get('PAGE_REPORT_RECEPIENTS') ||
      this.configService.get('FAILED_REPORT_RECEPIENTS') ||
      '';
    const to = emails.split(' ').filter(Boolean);

    if (!to.length) {
      this.logger.warn(
        `No recipients configured for wallet address alert: ${subject}`,
      );
      return;
    }

    await this.emailQueue.add('send-email', {
      to,
      options: {
        subject,
        text,
        html: text.replaceAll('\n', '<br>'),
      },
    });
  }
}
