import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entity/user.entity';
import { ListingImage } from './listing-image.entity';
import { ListingType } from '../types/listing-type.dto';
import { ListingLocation } from './listing-location.entity';
import { ListingRoom } from './listing-room.entity';
import { ListingAmenity } from './listing-amenity.entity';
import { ListingPriceHistory } from './listing-price-history.entity';
import { ConstructionType } from '../types/construction-type.dto';
import { ListingView } from './listing-view.entity';
import { ListingFavourite } from './listing-favourite.entity';
import { Chat } from 'src/chats/entity/chat.entity';

@Entity('Listing')
export class Listing extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true, type: 'enum', enum: ConstructionType })
  constructionType: ConstructionType;

  @Column({ nullable: true })
  constructionYear: number;

  @Column()
  price: number;

  @Column()
  livingSurface: number;

  @Column({ type: 'enum', enum: ListingType })
  type: ListingType;

  @ManyToOne(() => User, (user) => user.listings, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => ListingImage, (image) => image.listing, { cascade: true })
  images: ListingImage[];

  @OneToOne(() => ListingLocation, (location) => location.listing, {
    cascade: true,
  })
  location: ListingLocation;

  @OneToMany(() => ListingRoom, (room) => room.listing, { cascade: true })
  rooms: ListingRoom[];

  @OneToMany(() => ListingAmenity, (amenity) => amenity.listing, {
    cascade: true,
  })
  amenities: ListingAmenity[];

  @OneToMany(() => ListingView, (view) => view.listing, { cascade: true })
  views: ListingView[];

  @OneToMany(() => ListingFavourite, (favourite) => favourite.listing, {
    cascade: true,
  })
  favourites: ListingFavourite[];

  @OneToMany(
    () => ListingPriceHistory,
    (priceHistory) => priceHistory.listing,
    {
      cascade: true,
    },
  )
  priceHistory: ListingPriceHistory[];

  @OneToMany(() => Chat, (chat) => chat.broker, {
    cascade: true,
  })
  chats: Chat[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
