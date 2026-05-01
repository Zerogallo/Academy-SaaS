import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CheckinsModule } from './checkins/checkins.module';
import { TreadmillModule } from './treadmill/treadmill.module';
import { RankingsModule } from './rankings/rankings.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { StatsModule } from './stats/stats.module';
import { CommentsModule } from './Comments/Comments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'academy.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    CheckinsModule,
    TreadmillModule,
    RankingsModule,
    WorkoutsModule,
    StatsModule,
    CommentsModule,
  ],
})
export class AppModule {}