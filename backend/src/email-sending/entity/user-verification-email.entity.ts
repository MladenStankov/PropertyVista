import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UserVerification')
export class UserVerification {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Column()
  userEmail: string;

  @IsNotEmpty()
  @IsString()
  @Column({ unique: true })
  token: string;

  @Column()
  expirationDate: Date;
}
