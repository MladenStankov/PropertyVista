import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AmenityType } from '../types/amenity-type.dto';
import { Listing } from './listing.entity';

@Entity('ListingAmenity')
export class ListingAmenity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: AmenityType })
  type: AmenityType;

  @ManyToOne(() => Listing, (listing) => listing.amenities, {
    onDelete: 'CASCADE',
  })
  listing: Listing;
}
