import { Controller, Get, UseGuards } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('workouts')
@UseGuards(AuthGuard('jwt'))
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Get('all')
  getAllWorkouts() {
    return this.workoutsService.getAllWorkouts();
  }

  @Get('today')
  getTodayWorkout() {
    return this.workoutsService.getTodaysRecommendedWorkout();
  }
}