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
      'https://property-vista-images.s3.eu-north-1.amazonaws.com/default-profile-image.png',
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
