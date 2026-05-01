export declare class WorkoutsService {
    private workoutSequence;
    private workoutDetails;
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
    getTodaysRecommendedWorkout(): {
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
