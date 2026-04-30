import { User } from '../users/user.entity';
export declare class Checkin {
    id: number;
    user: User;
    checkinTime: Date;
    checkoutTime: Date;
    durationMinutes: number;
}
