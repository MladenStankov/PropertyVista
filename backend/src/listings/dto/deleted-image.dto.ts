import { IsNotEmpty } from 'class-validator';

export class DeletedImagesDto {
  @IsNotEmpty()
  imageUrl: string;
}
