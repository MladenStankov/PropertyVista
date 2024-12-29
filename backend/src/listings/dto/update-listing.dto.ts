import { IsNotEmpty, ValidateNested } from 'class-validator';
import { ListingDto } from './listing.dto';
import { ListingLocationDto } from './listing-location.dto';
import { ListingImageDto } from './listing-image.dto';
import { ListingAmenityDto } from './listing-amenity.dto';
import { ListingRoomDto } from './listing-room.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { DeletedImagesDto } from './deleted-image.dto';

export class UpdateListingDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ListingDto)
  @ApiProperty({ type: ListingDto, required: false })
  listing: Partial<ListingDto>;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ListingLocationDto)
  @ApiProperty({ type: ListingLocationDto, required: false })
  location: Partial<ListingLocationDto>;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ListingImageDto)
  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    required: false,
  })
  images: ListingImageDto[];

  @ApiProperty({ type: [DeletedImagesDto], required: false })
  deletedImages?: DeletedImagesDto[];

  @ValidateNested({ each: true })
  @Type(() => ListingAmenityDto)
  @ApiProperty({ type: [ListingAmenityDto], required: false })
  amenities?: ListingAmenityDto[];

  @ApiProperty({ type: [ListingAmenityDto], required: false })
  deletedAmenities?: ListingAmenityDto[];

  @ValidateNested({ each: true })
  @Type(() => ListingRoomDto)
  @ApiProperty({ type: [ListingRoomDto], required: false })
  rooms?: ListingRoomDto[];
}
