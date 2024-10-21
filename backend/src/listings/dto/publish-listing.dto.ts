import { IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateListingDto } from './create-listing.dto';
import { CreateListingLocationDto } from './create-listing-location.dto';
import { CreateListingImageDto } from './create-listing-image.dto';
import { CreateListingAmenityDto } from './create-listing-amenity.dto';
import { CreateListingRoomDto } from './create-listing-room.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PublishListingDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateListingDto)
  @ApiProperty({ type: CreateListingDto })
  createListing: CreateListingDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateListingLocationDto)
  @ApiProperty({ type: CreateListingLocationDto })
  createLocation: CreateListingLocationDto;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateListingImageDto)
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  createImages: CreateListingImageDto[];

  @ValidateNested({ each: true })
  @Type(() => CreateListingAmenityDto)
  @ApiProperty({ type: [CreateListingAmenityDto], required: false })
  createAmenities?: CreateListingAmenityDto[];

  @ValidateNested({ each: true })
  @Type(() => CreateListingRoomDto)
  @ApiProperty({ type: [CreateListingRoomDto], required: false })
  createRooms?: CreateListingRoomDto[];
}
