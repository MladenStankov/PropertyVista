import { User } from 'src/users/entity/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('AuthRefreshToken')
export class AuthRefreshToken extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  refreshToken: string;

  @Column()
  expiresAt: Date;

  @Column()
  userId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;
}
