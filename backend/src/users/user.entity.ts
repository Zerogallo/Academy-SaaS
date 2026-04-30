import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Checkin } from '../checkins/checkin.entity';
import { TreadmillSession } from '../treadmill/treadmill.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 'default.jpg' })
  photo: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  lastEvaluationDate: Date;

  @OneToMany(() => Checkin, (checkin) => checkin.user)
  checkins: Checkin[];

  @OneToMany(() => TreadmillSession, (session) => session.user)
  treadmillSessions: TreadmillSession[];
}