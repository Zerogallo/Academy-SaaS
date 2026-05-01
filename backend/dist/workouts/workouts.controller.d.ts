import { WorkoutsService } from './workouts.service';
export declare class WorkoutsController {
    private readonly workoutsService;
    constructor(workoutsService: WorkoutsService);
    getAllWorkouts(): {
        type: string;
        exercises: string[];
        always: string;
    }[];
    getTodayWorkout(): {
        type: string;
        exercises: any;
        always: string;
    };
}
