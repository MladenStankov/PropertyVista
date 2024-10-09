import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  fullName: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  @IsStrongPassword()
  password?: string;

  @IsString()
  @Column({ nullable: true })
  phoneNumber?: string;

  @IsString()
  @Column({ default: null })
  imageUrl?: string;

  @Column({ default: false })
  isVerified: boolean = false;

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
