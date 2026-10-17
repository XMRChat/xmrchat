import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { MoneroUtils } from 'monero-ts';
import { NetworkService } from 'src/network/network.service';

@Injectable()
@ValidatorConstraint({ name: 'customText', async: true })
export class IsMoneroPrimaryAdrress implements ValidatorConstraintInterface {
  constructor(private networkService: NetworkService) {}
  async validate(text: string, args: ValidationArguments) {
    const networkType = this.networkService.getNetwork().validationNetwork;

    // 95 character length prevents integrated addresses.
    if (text.length > 95) return false;
    return MoneroUtils.isValidAddress(text, networkType);
  }

  defaultMessage() {
    return 'Primary address is invalid';
  }
}
