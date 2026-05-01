import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Checkin } from '../checkins/checkin.entity';
import { TreadmillSession } from '../treadmill/treadmill.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Checkin)
    private checkinsRepository: Repository<Checkin>,
    @InjectRepository(TreadmillSession)
    private treadmillRepository: Repository<TreadmillSession>,
  ) {}

  async getTodayStats(userId: number) {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Buscar check-ins finalizados hoje
    const checkins = await this.checkinsRepository
      .createQueryBuilder('checkin')
      .where('checkin.userId = :userId', { userId })
      .andWhere('checkin.checkoutTime BETWEEN :start AND :end', { start: todayStart, end: todayEnd })
      .getMany();
    const totalAcademyMinutes = checkins.reduce((sum, c) => sum + (c.durationMinutes || 0), 0);

    // Buscar sessões de esteira finalizadas hoje
    const treadmillSessions = await this.treadmillRepository
      .createQueryBuilder('treadmill')
      .where('treadmill.userId = :userId', { userId })
      .andWhere('treadmill.endTime BETWEEN :start AND :end', { start: todayStart, end: todayEnd })
      .getMany();
    const totalTreadmillMinutes = treadmillSessions.reduce((sum, t) => sum + (t.durationMinutes || 0), 0);

    return {
      academyMinutes: totalAcademyMinutes,
      treadmillMinutes: totalTreadmillMinutes,
      academyGoal: 60,    // meta diária de 60 min na academia
      treadmillGoal: 30,  // meta diária de 30 min na esteira
    };
  }

  async getWeeklyStats(userId: number) {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);
    weekStart.setHours(0, 0, 0, 0);
    const now = new Date();

    const checkins = await this.checkinsRepository
      .createQueryBuilder('checkin')
      .where('checkin.userId = :userId', { userId })
      .andWhere('checkin.checkoutTime BETWEEN :start AND :end', { start: weekStart, end: now })
      .getMany();
    const totalAcademyMinutes = checkins.reduce((sum, c) => sum + (c.durationMinutes || 0), 0);

    const treadmillSessions = await this.treadmillRepository
      .createQueryBuilder('treadmill')
      .where('treadmill.userId = :userId', { userId })
      .andWhere('treadmill.endTime BETWEEN :start AND :end', { start: weekStart, end: now })
      .getMany();
    const totalTreadmillMinutes = treadmillSessions.reduce((sum, t) => sum + (t.durationMinutes || 0), 0);

    return { academyMinutes: totalAcademyMinutes, treadmillMinutes: totalTreadmillMinutes };
  }
}