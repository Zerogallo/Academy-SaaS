import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class TreadmillSession {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.treadmillSessions)
  user: User;

  @Column()
  startTime: Date;

  @Column({ nullable: true })
  endTime: Date;

  @Column({ nullable: true })
  durationMinutes: number;
}