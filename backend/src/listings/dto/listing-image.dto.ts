import { IsNotEmpty } from 'class-validator';
import { Listing } from '../entity/listing.entity';
import { ApiHideProperty } from '@nestjs/swagger';

export class ListingImageDto {
  @IsNotEmpty()
  file: Express.Multer.File;

  @ApiHideProperty()
  listing?: Listing;
}
