import { Checkin } from '../checkins/checkin.entity';
import { TreadmillSession } from '../treadmill/treadmill.entity';
export declare class User {
    id: number;
    name: string;
    photo: string;
    email: string;
    password: string;
    lastEvaluationDate: Date;
    checkins: Checkin[];
    treadmillSessions: TreadmillSession[];
}
