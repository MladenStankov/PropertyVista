import { IsNotEmpty, ValidateNested } from 'class-validator';
import { ListingDto } from './listing.dto';
import { ListingLocationDto } from './listing-location.dto';
import { ListingImageDto } from './listing-image.dto';
import { ListingAmenityDto } from './listing-amenity.dto';
import { ListingRoomDto } from './listing-room.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PublishListingDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ListingDto)
  @ApiProperty({ type: ListingDto })
  listing: ListingDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ListingLocationDto)
  @ApiProperty({ type: ListingLocationDto })
  location: ListingLocationDto;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ListingImageDto)
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  images: ListingImageDto[];

  @ValidateNested({ each: true })
  @Type(() => ListingAmenityDto)
  @ApiProperty({ type: [ListingAmenityDto], required: false })
  amenities?: ListingAmenityDto[];

  @ValidateNested({ each: true })
  @Type(() => ListingRoomDto)
  @ApiProperty({ type: [ListingRoomDto], required: false })
  rooms?: ListingRoomDto[];
}
