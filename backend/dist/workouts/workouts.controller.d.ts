import { WorkoutsService } from './workouts.service';
export declare class WorkoutsController {
    private workoutsService;
    constructor(workoutsService: WorkoutsService);
    getTodayWorkout(): {
        type: string;
        exercises: any;
        always: string;
    };
}
