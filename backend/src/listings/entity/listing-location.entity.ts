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
  streetNumber: string;

  @Column()
  streetName: string;

  @Column()
  postalCode: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column('float')
  longitude: number;

  @Column('float')
  latitude: number;

  @OneToOne(() => Listing, (listing) => listing.location, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  listing: Listing;
}
