import { IsNotEmpty, IsString } from 'class-validator';
import { Listing } from '../entity/listing.entity';
import { ApiHideProperty } from '@nestjs/swagger';

export class CreateListingLocationDto {
  @IsString()
  @IsNotEmpty()
  streetNumber: string;

  @IsString()
  @IsNotEmpty()
  streetName: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  state: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  longitude: number;

  @IsNotEmpty()
  latitude: number;

  @ApiHideProperty()
  listing?: Listing;
}
