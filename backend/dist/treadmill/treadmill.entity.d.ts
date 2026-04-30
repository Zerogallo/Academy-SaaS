import { User } from '../users/user.entity';
export declare class TreadmillSession {
    id: number;
    user: User;
    startTime: Date;
    endTime: Date;
    durationMinutes: number;
}
