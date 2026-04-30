import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { RankingsService } from './rankings.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('rankings')
@UseGuards(AuthGuard('jwt'))
export class RankingsController {
  constructor(private rankingsService: RankingsService) {}

  @Get()
  async getRanking(@Query('period') period: 'week' | 'month') {
    return this.rankingsService.getRankingGeneral(period);
  }
}