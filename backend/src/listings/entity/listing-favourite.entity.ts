import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Listing } from './listing.entity';
import { User } from '../../users/entity/user.entity';

@Entity('ListingFavourite')
export class ListingFavourite extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Listing, (listing) => listing.favourites, {
    onDelete: 'CASCADE',
  })
  listing: Listing;

  @ManyToOne(() => User, (user) => user.favourites, {
    onDelete: 'CASCADE',
  })
  user: User;
}
