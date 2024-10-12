import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/users/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UserVerificationEmail')
export class UserVerificationEmail {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  userId: number;

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

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;
}
