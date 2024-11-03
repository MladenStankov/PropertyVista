import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Listing } from 'src/listings/entity/listing.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  fullName: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @Column({ nullable: true })
  @IsStrongPassword()
  password?: string;

  @IsString()
  @Column({
    default:
      's3://property-vista-images/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg',
    nullable: true,
  })
  imageUrl?: string;

  @Column({ default: false })
  isVerified: boolean = false;

  @OneToMany(() => Listing, (listing) => listing.user, { cascade: true })
  listings: Listing[];

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
