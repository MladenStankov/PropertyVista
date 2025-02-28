import { Listing } from '../../listings/entity/listing.entity';
import { User } from '../../users/entity/user.entity';
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message.entity';

@Entity('Chat')
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => Listing, (Listing) => Listing.chats, { onDelete: 'CASCADE' })
  listing: Listing;

  @ManyToOne(() => User, (user) => user.brokerChats, { onDelete: 'CASCADE' })
  broker: User;

  @ManyToOne(() => User, (user) => user.homeSeekerChats, {
    onDelete: 'CASCADE',
  })
  homeSeeker: User;

  @OneToMany(() => Message, (message) => message.chat, {
    cascade: true,
  })
  messages: Message[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
