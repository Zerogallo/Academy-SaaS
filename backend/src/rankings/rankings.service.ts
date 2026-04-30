import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Checkin } from '../checkins/checkin.entity';
import { TreadmillSession } from '../treadmill/treadmill.entity';
import { User } from '../users/user.entity';

@Injectable()
export class RankingsService {
  constructor(
    @InjectRepository(Checkin)
    private checkinsRepository: Repository<Checkin>,
    @InjectRepository(TreadmillSession)
    private treadmillRepository: Repository<TreadmillSession>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getRankingGeneral(period: 'week' | 'month' = 'month') {
    const startDate = new Date();
    if (period === 'week') startDate.setDate(startDate.getDate() - 7);
    else startDate.setMonth(startDate.getMonth() - 1);

    // Buscar tempo total na academia por usuário
    const academyStats = await this.checkinsRepository
      .createQueryBuilder('checkin')
      .select('checkin.userId', 'userId')
      .addSelect('SUM(checkin.durationMinutes)', 'totalMinutes')
      .where('checkin.checkoutTime IS NOT NULL')
      .andWhere('checkin.checkoutTime >= :startDate', { startDate })
      .groupBy('checkin.userId')
      .getRawMany();

    // Buscar tempo total na esteira por usuário
    const treadmillStats = await this.treadmillRepository
      .createQueryBuilder('treadmill')
      .select('treadmill.userId', 'userId')
      .addSelect('SUM(treadmill.durationMinutes)', 'totalMinutes')
      .where('treadmill.endTime IS NOT NULL')
      .andWhere('treadmill.endTime >= :startDate', { startDate })
      .groupBy('treadmill.userId')
      .getRawMany();

    // Mapear dados dos usuários
    const userMap = new Map();

    for (const item of academyStats) {
      const user = await this.usersRepository.findOne({ where: { id: item.userId } });
      if (user) {
        userMap.set(item.userId, {
          id: user.id,
          name: user.name,
          photo: user.photo,
          
          totalAcademy: Number(item.totalMinutes),
          totalTreadmill: 0,
        });
      }
    }

    for (const item of treadmillStats) {
      if (userMap.has(item.userId)) {
        userMap.get(item.userId).totalTreadmill += Number(item.totalMinutes);
      } else {
        const user = await this.usersRepository.findOne({ where: { id: item.userId } });
        if (user) {
          userMap.set(item.userId, {
            id: user.id,
            name: user.name,
            photo: user.photo,
            totalAcademy: 0,
            totalTreadmill: Number(item.totalMinutes),
          });
        }
      }
    }

    // Converter para array e ordenar por tempo na academia (totalAcademy)
    const ranking = Array.from(userMap.values());
    ranking.sort((a, b) => b.totalAcademy - a.totalAcademy);
    return ranking.slice(0, 3); // Top 3
  }
}