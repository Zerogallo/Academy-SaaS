import { Controller, Get, Post, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.usersService.findById(req.user.userId);
    const { password, ...result } = user;
    return result;
  }

  @Get('needs-evaluation')
  async needsEvaluation(@Request() req) {
    const needs = await this.usersService.needsEvaluation(req.user.userId);
    return { needs };
  }

  @Post('renew-evaluation')
  async renewEvaluation(@Request() req) {
    await this.usersService.updateEvaluation(req.user.userId);
    return { message: 'Avaliação renovada com sucesso' };
  }
}