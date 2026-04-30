import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Checkin } from './checkin.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class CheckinsService {
  constructor(
    @InjectRepository(Checkin)
    private checkinsRepository: Repository<Checkin>,
    private usersService: UsersService,
  ) {}

  async checkin(userId: number): Promise<Checkin> {
    const user = await this.usersService.findById(userId);
    const activeCheckin = await this.checkinsRepository.findOne({
      where: { user: { id: userId }, checkoutTime: null },
    });
    if (activeCheckin) throw new BadRequestException('Usuário já está com check-in ativo');

    const checkin = this.checkinsRepository.create({
      user,
      checkinTime: new Date(),
    });
    return this.checkinsRepository.save(checkin);
  }

  async checkout(userId: number): Promise<Checkin> {
    const checkin = await this.checkinsRepository.findOne({
      where: { user: { id: userId }, checkoutTime: null },
      relations: ['user'],
    });
    if (!checkin) throw new NotFoundException('Nenhum check-in ativo encontrado');

    checkin.checkoutTime = new Date();
    const durationMs = checkin.checkoutTime.getTime() - checkin.checkinTime.getTime();
    checkin.durationMinutes = Math.floor(durationMs / 60000);
    return this.checkinsRepository.save(checkin);
  }

  async getActiveCheckin(userId: number): Promise<Checkin | null> {
    return this.checkinsRepository.findOne({
      where: { user: { id: userId }, checkoutTime: null },
    });
  }
}