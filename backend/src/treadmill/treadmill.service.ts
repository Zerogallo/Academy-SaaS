import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TreadmillSession } from './treadmill.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class TreadmillService {
  constructor(
    @InjectRepository(TreadmillSession)
    private treadmillRepository: Repository<TreadmillSession>,
    private usersService: UsersService,
  ) {}

  async startTreadmill(userId: number): Promise<TreadmillSession> {
    const user = await this.usersService.findById(userId);
    const activeSession = await this.treadmillRepository.findOne({
      where: { user: { id: userId }, endTime: null },
    });
    if (activeSession) throw new BadRequestException('Já existe sessão de esteira ativa');

    const session = this.treadmillRepository.create({
      user,
      startTime: new Date(),
    });
    return this.treadmillRepository.save(session);
  }

  async endTreadmill(userId: number): Promise<TreadmillSession> {
    const session = await this.treadmillRepository.findOne({
      where: { user: { id: userId }, endTime: null },
    });
    if (!session) throw new NotFoundException('Nenhuma sessão de esteira ativa');

    session.endTime = new Date();
    const durationMs = session.endTime.getTime() - session.startTime.getTime();
    session.durationMinutes = Math.floor(durationMs / 60000);
    return this.treadmillRepository.save(session);
  }

  async getActiveSession(userId: number): Promise<TreadmillSession | null> {
    return this.treadmillRepository.findOne({
      where: { user: { id: userId }, endTime: null },
    });
  }
}