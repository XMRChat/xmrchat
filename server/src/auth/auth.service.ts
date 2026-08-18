import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dtos/auth.dto';
import { UsersService } from 'src/users/users.service';
import { createFinalPassword, hashPassword } from 'src/shared/utils';
import { NotificationsService } from 'src/notifications/notifications.service';
import { RolesEnum, UserTokenType } from 'src/shared/constants/enum';
import { UserTokensService } from './user-tokens/user-tokens.service';
import { User } from 'src/users/user.entity';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private notificationsService: NotificationsService,
    private userTokensService: UserTokensService,
    private i18n: I18nService,
  ) {}

  async signup(authDto: AuthDto) {
    const current = await this.usersService.findByEmail(authDto.email);

    if (current)
      throw new BadRequestException(this.i18n.t('error.userAlreadyExists'));

    const locale = I18nContext.current().lang;

    const user = await this.usersService.createUser({
      ...authDto,
      language: locale,
    });

    if (!user)
      throw new BadRequestException(this.i18n.t('error.userCouldNotBeCreated'));

    const { token } = await this.userTokensService.createToken({
      userId: user.id,
      type: UserTokenType.EMAIL_VERIFICATION,
    });


    this.notificationsService.sendVerificationEmail(user.email, token);

    return {
      message: 'Please verify your email using the link sent to your inbox.',
    };
  }

  async login(authDto: AuthDto) {
    const user = await this.usersService.findByEmail(authDto.email);

    if (!user)
      throw new BadRequestException(
        this.i18n.t('error.usernamePasswordIncorrect'),
      );

    const [salt, storedHash] = user.password.split('.');

    const hash = hashPassword(authDto.password, salt);

    if (storedHash != hash)
      throw new BadRequestException(
        this.i18n.t('error.usernamePasswordIncorrect'),
      );

    if (!user.isEmailVerified) {
      let token: string;
      try {
        const { token: result } = await this.userTokensService.createToken({
          userId: user.id,
          type: UserTokenType.EMAIL_VERIFICATION,
        });
        token = result;
      } catch (error) {
        throw new BadRequestException(
          this.i18n.t('general.weHaveAlreadySentYouAVerificationEmail'),
        );
      }

      this.notificationsService.sendVerificationEmail(user.email, token);

      throw new BadRequestException(
        this.i18n.t('general.weHaveJustSentYouAnotherVerificationEmail', {
          args: { email: user.email },
        }),
      );
    }

    const token = await this.generateJwt(user);

    return {
      access_token: token,
    };
  }

  async verifyEmail(token: string) {
    const userToken = await this.userTokensService.validateToken(
      token,
      UserTokenType.EMAIL_VERIFICATION,
    );

    await this.usersService.update(userToken.userId, {
      isEmailVerified: true,
    });

    await this.userTokensService.remove(userToken.id);

    return { message: this.i18n.t('general.yourAccountIsVerified') };
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user)
      return {
        message: this.i18n.t(
          'general.emailIsSentToYourMailboxIfYouWereAlreadyRegistered',
        ),
      };

    let token: string;
    try {
      const { token: result } = await this.userTokensService.createToken({
        userId: user.id,
        type: UserTokenType.RESET_PASSWORD,
      });

      token = result;
    } catch (error) {
      throw new BadRequestException(
        this.i18n.t('general.weHaveAlreadySentYouAVerificationEmail'),
      );
    }


    this.notificationsService.sendResetPasswordEmail(user.email, token);

    return {
      message: this.i18n.t(
        'general.emailIsSentToYourMailboxIfYouWereAlreadyRegistered',
      ),
    };
  }

  async resetPassword(token: string, password: string) {
    const userToken = await this.userTokensService.validateToken(
      token,
      UserTokenType.RESET_PASSWORD,
    );

    const user = await this.usersService.findById(userToken.userId);

    const passwordResult = createFinalPassword(password);

    await this.usersService.update(userToken.userId, {
      password: passwordResult,
      isEmailVerified: true,
      tokenVersion: (user.tokenVersion ?? 0) + 1,
    });

    await this.userTokensService.remove(userToken.id);

    this.notificationsService.sendPasswordChangeEmail(user.email);

    return {
      message: this.i18n.t('general.passwordChanged'),
    };
  }

  async updatePassword(user: User, data: UpdatePasswordDto) {
    const [salt, storedHash] = user.password.split('.');

    const hash = hashPassword(data.currentPassword, salt);

    if (hash !== storedHash) {
      throw new BadRequestException(this.i18n.t('error.invalidCredentials'));
    }

    const tokenVersion = (user.tokenVersion ?? 0) + 1;

    await this.usersService.update(user.id, {
      password: createFinalPassword(data.password),
      tokenVersion,
    });

    this.notificationsService.sendPasswordChangeEmail(user.email);

    return {
      message: this.i18n.t('general.accountPasswordUpdated'),
      access_token: await this.generateJwt({
        ...user,
        tokenVersion,
      }),
    };
  }

  async getUser(id: number) {
    return this.usersService.findById(id);
  }

  async changeRoleOfEmail(
    email: string,
    change: 'add' | 'remove' = 'add',
    role: RolesEnum,
  ) {
    const user = await this.usersService.findByEmail(email);

    if (!user) throw new NotFoundException('User not found');

    const roles = user.roles;

    if (change === 'add') {
      user.roles.push(role);
    } else {
      user.roles = user.roles.filter((r) => r !== role);
    }

    return this.usersService.update(user.id, user);
  }

  generateJwt(user: Pick<User, 'id' | 'email' | 'tokenVersion'>) {
    return this.jwtService.signAsync({
      userId: user.id,
      email: user.email,
      tokenVersion: user.tokenVersion ?? 0,
    });
  }
}
