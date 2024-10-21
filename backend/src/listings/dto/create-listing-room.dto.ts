import { IsNotEmpty } from 'class-validator';
import { Listing } from '../entity/listing.entity';
import { RoomType } from '../types/room-type.dto';
import { ApiHideProperty } from '@nestjs/swagger';

export class CreateListingRoomDto {
  @IsNotEmpty()
  type: RoomType;

  @IsNotEmpty()
  amount: number;

  @ApiHideProperty()
  listing?: Listing;
}
