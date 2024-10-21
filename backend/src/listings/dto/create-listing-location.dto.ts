import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Listing } from '../entity/listing.entity';
import { ApiHideProperty } from '@nestjs/swagger';

export class CreateListingLocationDto {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @ApiHideProperty()
  listing?: Listing;
}
