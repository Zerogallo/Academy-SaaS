export declare class WorkoutsService {
    private workoutSequence;
    getTodaysWorkout(): {
        type: string;
        exercises: any;
        always: string;
    };
    getWorkoutByType(type: string): any;
}
