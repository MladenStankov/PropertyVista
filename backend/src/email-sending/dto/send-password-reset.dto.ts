import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendPasswordResetDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
}
