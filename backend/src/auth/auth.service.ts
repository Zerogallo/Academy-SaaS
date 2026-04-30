import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  
  async register(registerDto: RegisterDto, photoPath?: string) {
    const existingUser = await this.usersRepository.findOne({ where: { email: registerDto.email } });
    if (existingUser) throw new ConflictException('E-mail já cadastrado');

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = this.usersRepository.create({
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
      photo: photoPath || 'default.jpg',
      lastEvaluationDate: new Date(),
    });
    return this.usersRepository.save(user); // ← salvando no banco
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.usersRepository.findOne({ where: { email: loginDto.email } });
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Credenciais inválidas');

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}