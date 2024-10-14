import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('PasswordReset')
export class PasswordReset {
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
