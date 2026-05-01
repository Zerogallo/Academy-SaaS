import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { Checkin } from '../checkins/checkin.entity';
import { TreadmillSession } from '../treadmill/treadmill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Checkin, TreadmillSession])],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}