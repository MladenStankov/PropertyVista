import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeNameDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;
}
