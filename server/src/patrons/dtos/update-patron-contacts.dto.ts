import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdatePatronContactsDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(400)
  signal?: string;

  @IsOptional()
  @IsString()
  @MaxLength(400)
  simplex?: string;
}
