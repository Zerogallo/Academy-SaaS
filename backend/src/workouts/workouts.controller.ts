import { Controller, Get, UseGuards } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('workouts')
@UseGuards(AuthGuard('jwt'))
export class WorkoutsController {
  constructor(private workoutsService: WorkoutsService) {}

  @Get('today')
  getTodayWorkout() {
    return this.workoutsService.getTodaysWorkout();
  }
}