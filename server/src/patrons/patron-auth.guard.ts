import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PatronsService } from './patrons.service';

export const PATRON_TOKEN_HEADER = 'x-patron-token';

/**
 * Add this guard on the routes that require a logged in patron, it loads the
 * patron of the patron token and sets it as request.patron.
 */
@Injectable()
export class PatronAuthGuard implements CanActivate {
  constructor(private patronsService: PatronsService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.[PATRON_TOKEN_HEADER];

    const patron = await this.patronsService.validatePatronToken(token);
    if (!patron) throw new UnauthorizedException('Invalid patron token.');

    request.patron = patron;
    return true;
  }
}

/**
 * Use this guard on public routes that behave differently for a logged in
 * patron. It sets request.patron when the patron token is valid and never
 * rejects the request, a missing or invalid token is treated as logged out.
 */
@Injectable()
export class OptionalPatronAuthGuard implements CanActivate {
  constructor(private patronsService: PatronsService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.[PATRON_TOKEN_HEADER];

    const patron = await this.patronsService.validatePatronToken(token);

    request.patron = patron ?? undefined;
    return true;
  }
}
