import { IsUUID } from 'class-validator';

export class PushAcknowledgementDto {
  @IsUUID()
  nonce: string;
}
