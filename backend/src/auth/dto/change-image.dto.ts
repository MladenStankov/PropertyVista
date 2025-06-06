import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ChangeImageDto {
  @IsNotEmpty()
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;
}
