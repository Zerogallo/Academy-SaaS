import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankingsService } from './rankings.service';
import { RankingsController } from './rankings.controller';
import { Checkin } from '../checkins/checkin.entity';
import { TreadmillSession } from '../treadmill/treadmill.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Checkin, TreadmillSession, User])],
  providers: [RankingsService],
  controllers: [RankingsController],
})
export class RankingsModule {}