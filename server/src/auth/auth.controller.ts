import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  Logger,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsPublic } from 'src/shared/decorators/is-public.decorator';
import { AuthDto } from './dtos/auth.dto';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/shared/interceptors/serialize.interceptor';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { PagesService } from 'src/pages/pages.service';
import { MeRO } from './dtos/me.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { seconds, Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);

  constructor(
    private authService: AuthService,
    private pagesService: PagesService,
  ) {}

  @Throttle({ default: { ttl: seconds(1), limit: 2 } })
  @IsPublic()
  @Post('/signup')
  signup(@Body() body: AuthDto) {
    return this.authService.signup(body);
  }

  @Throttle({ default: { ttl: seconds(1), limit: 2 } })
  @IsPublic()
  @Post('/login')
  login(@Body() body: AuthDto) {
    return this.authService.login(body);
  }

  @Get('/me')
  @Serialize(MeRO)
  async me(@CurrentUser() currentUser: User) {
    const page = await this.pagesService.findMyPage(currentUser);

    return {
      user: currentUser,
      page,
    };
  }

  @IsPublic()
  @Post('/email-verification/:token')
  emailVerification(@Param('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @IsPublic()
  @Post('/forgot-password')
  forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body.email);
  }

  @IsPublic()
  @Post('/reset-password/:token')
  resetPassword(@Body() body: ResetPasswordDto, @Param('token') token: string) {
    return this.authService.resetPassword(token, body.password);
  }

  @Post('/update-password')
  updatePassword(@Body() body: UpdatePasswordDto, @CurrentUser() user: User) {
    return this.authService.updatePassword(user, body);
  }

  @Throttle({ default: { ttl: seconds(1), limit: 2 } })
  @Post('/logout-all')
  logoutAll(@CurrentUser() user: User) {
    return this.authService.logoutAllSessions(user);
  }
}
