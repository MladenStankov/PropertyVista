import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListingRoom } from '../entity/listing-room.entity';
import { Repository } from 'typeorm';
import { ListingRoomDto } from '../dto/listing-room.dto';

@Injectable()
export class ListingRoomsService {
  constructor(
    @InjectRepository(ListingRoom)
    private listingRoomRepository: Repository<ListingRoom>,
  ) {}

  async create(createListingRoomDto: ListingRoomDto): Promise<ListingRoom> {
    const newListingAmenity =
      this.listingRoomRepository.create(createListingRoomDto);

    return newListingAmenity.save();
  }

  async getAllByListingUuid(listingUuid: string): Promise<ListingRoom[]> {
    return this.listingRoomRepository.find({
      where: { listing: { uuid: listingUuid } },
    });
  }
}
