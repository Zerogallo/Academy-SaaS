import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Checkin {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.checkins)
  user: User;

  @Column()
  checkinTime: Date;

  @Column({ nullable: true })
  checkoutTime: Date;

  @Column({ nullable: true })
  durationMinutes: number; // tempo total em minutos
}