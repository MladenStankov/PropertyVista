import { IsNotEmpty } from 'class-validator';
import { AmenityType } from '../types/amenity-type.dto';
import { Listing } from '../entity/listing.entity';
import { ApiHideProperty } from '@nestjs/swagger';

export class CreateListingAmenityDto {
  @IsNotEmpty()
  type: AmenityType;

  @ApiHideProperty()
  listing?: Listing;
}
