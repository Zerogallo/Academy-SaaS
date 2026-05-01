import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { StatsService } from './stats.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('stats')
@UseGuards(AuthGuard('jwt'))
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('today')
  async getTodayStats(@Request() req) {
    return this.statsService.getTodayStats(req.user.userId);
  }

  @Get('weekly')
  async getWeeklyStats(@Request() req) {
    return this.statsService.getWeeklyStats(req.user.userId);
  }
}