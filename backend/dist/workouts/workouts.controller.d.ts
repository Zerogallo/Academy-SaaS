import { WorkoutsService } from './workouts.service';
export declare class WorkoutsController {
    private readonly workoutsService;
    constructor(workoutsService: WorkoutsService);
    getAllWorkouts(): {
        type: string;
        exercises: string[];
        details: {
            nome: string;
            aparelho: string;
            series: number;
            repeticoes: string;
            obs: string;
        }[];
        always: string;
    }[];
    getTodayWorkout(): {
        type: string;
        exercises: any;
        details: any;
        always: string;
    };
    getWorkoutByType(type: string): {
        type: string;
        exercises: any;
        details: any;
        always: string;
    };
}
