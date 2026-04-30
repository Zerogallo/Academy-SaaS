import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async updateEvaluation(userId: number): Promise<User> {
    const user = await this.findById(userId);
    user.lastEvaluationDate = new Date();
    return this.usersRepository.save(user);
  }

  async needsEvaluation(userId: number): Promise<boolean> {
    const user = await this.findById(userId);
    if (!user.lastEvaluationDate) return true;
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return user.lastEvaluationDate < threeMonthsAgo;
  }

  async updatePhoto(userId: number, photoPath: string): Promise<User> {
    const user = await this.findById(userId);
    user.photo = photoPath;
    return this.usersRepository.save(user);
  }
}