import { Repository } from 'typeorm';
import { Checkin } from '../checkins/checkin.entity';
import { TreadmillSession } from '../treadmill/treadmill.entity';
export declare class StatsService {
    private checkinsRepository;
    private treadmillRepository;
    constructor(checkinsRepository: Repository<Checkin>, treadmillRepository: Repository<TreadmillSession>);
    getTodayStats(userId: number): Promise<{
        academyMinutes: number;
        treadmillMinutes: number;
        academyGoal: number;
        treadmillGoal: number;
    }>;
    getWeeklyStats(userId: number): Promise<{
        academyMinutes: number;
        treadmillMinutes: number;
    }>;
}
