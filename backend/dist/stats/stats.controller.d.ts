import { StatsService } from './stats.service';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    getTodayStats(req: any): Promise<{
        academyMinutes: number;
        treadmillMinutes: number;
        academyGoal: number;
        treadmillGoal: number;
    }>;
    getWeeklyStats(req: any): Promise<{
        academyMinutes: number;
        treadmillMinutes: number;
    }>;
}
