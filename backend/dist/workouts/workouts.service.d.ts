export declare class WorkoutsService {
    private workoutSequence;
    getAllWorkouts(): {
        type: string;
        exercises: string[];
        always: string;
    }[];
    getTodaysRecommendedWorkout(): {
        type: string;
        exercises: any;
        always: string;
    };
    getWorkoutByType(type: string): any;
}
