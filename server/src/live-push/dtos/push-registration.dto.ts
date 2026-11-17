import { IsUrl, Matches, MaxLength } from 'class-validator';

export class PushRegistrationDto {
  @IsUrl({ protocols: ['https'], require_protocol: true })
  @MaxLength(4096)
  endpoint: string;

  @Matches(/^[A-Za-z0-9_-]{87}$/)
  p256dh: string;

  @Matches(/^[A-Za-z0-9_-]{22}$/)
  auth: string;
}
