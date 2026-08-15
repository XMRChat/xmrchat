import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { WS_GUARD_METADATA } from 'src/shared/constants';
import { isJwtSessionValid, JwtPayload } from 'src/shared/utils';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();

    const token = client.handshake?.auth?.token;

    if (!token) {
      throw new WsException('Unauthorized');
    }

    const payload = this.jwtService.verify(token);

    const user = await this.usersService.findById(payload.userId);

    if (!user || !isJwtSessionValid(payload, user)) {
      throw new WsException('Unauthorized');
    }

    client.user = user;

    return true;
  }
}
