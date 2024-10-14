import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class ValidatePasswordReset {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @IsString()
  password: string;
}
