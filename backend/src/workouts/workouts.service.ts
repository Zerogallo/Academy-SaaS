import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkoutsService {
  private workoutSequence = {
    A: ['Peito', 'Ombro', 'Tríceps'],
    B: ['Costas', 'Bíceps'],
    C: ['Pernas', 'Abdômen'],
  };

  getTodaysWorkout() {
    const dayIndex = new Date().getDay(); // 0 = domingo
    const workouts = ['A', 'B', 'C'];
    const todayWorkout = workouts[dayIndex % 3];
    return {
      type: todayWorkout,
      exercises: this.workoutSequence[todayWorkout],
      always: 'Esteira (registrar tempo separadamente)',
    };
  }

  getWorkoutByType(type: string) {
    return this.workoutSequence[type] || null;
  }
} 