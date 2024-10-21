import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Listing } from './listing.entity';

@Entity('ListingLocation')
export class ListingLocation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  longitude: number;

  @Column()
  latitude: number;

  @OneToOne(() => Listing, (listing) => listing.location, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  listing: Listing;
}
