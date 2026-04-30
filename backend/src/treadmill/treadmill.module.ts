import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreadmillSession } from './treadmill.entity';
import { TreadmillService } from './treadmill.service';
import { TreadmillController } from './treadmill.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([TreadmillSession]), UsersModule],
  providers: [TreadmillService],
  controllers: [TreadmillController],
})
export class TreadmillModule {}