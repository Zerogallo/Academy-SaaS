import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<{
        id: number;
        name: string;
        photo: string;
        email: string;
        lastEvaluationDate: Date;
        checkins: import("../checkins/checkin.entity").Checkin[];
        treadmillSessions: import("../treadmill/treadmill.entity").TreadmillSession[];
    }>;
    needsEvaluation(req: any): Promise<{
        needs: boolean;
    }>;
    renewEvaluation(req: any): Promise<{
        message: string;
    }>;
}
