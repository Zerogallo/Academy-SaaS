import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkoutsService {
  private workoutSequence = {
    A: ['Peito', 'Ombro', 'Tríceps'],
    B: ['Costas', 'Bíceps'],
    C: ['Pernas', 'Abdômen'],
  };

  getAllWorkouts() {
    return [
      { type: 'A', exercises: this.workoutSequence.A, always: 'Esteira (registrar tempo separadamente)' },
      { type: 'B', exercises: this.workoutSequence.B, always: 'Esteira (registrar tempo separadamente)' },
      { type: 'C', exercises: this.workoutSequence.C, always: 'Esteira (registrar tempo separadamente)' },
    ];
  }

  getTodaysRecommendedWorkout() {
    const dayIndex = new Date().getDay(); // 0 = domingo, 1 = segunda...
    const workouts = ['A', 'B', 'C'];
    const recommendedType = workouts[dayIndex % 3];
    return {
      type: recommendedType,
      exercises: this.workoutSequence[recommendedType],
      always: 'Esteira (registrar tempo separadamente)',
    };
  }

  getWorkoutByType(type: string) {
    return this.workoutSequence[type] || null;
  }
}