import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoomType } from '../types/room-type.dto';
import { Listing } from './listing.entity';

@Entity('ListingRoom')
export class ListingRoom extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: RoomType })
  type: RoomType;

  @Column()
  amount: number;

  @ManyToOne(() => Listing, (listing) => listing.rooms, { onDelete: 'CASCADE' })
  listing: Listing;
}
