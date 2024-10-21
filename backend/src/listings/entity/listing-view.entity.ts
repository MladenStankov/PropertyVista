import { CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ListingView')
export class ListingView {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
