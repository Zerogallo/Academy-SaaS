import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checkin } from './checkin.entity';
import { CheckinsService } from './checkins.service';
import { CheckinsController } from './checkins.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Checkin]), UsersModule],
  providers: [CheckinsService],
  controllers: [CheckinsController],
})
export class CheckinsModule {}