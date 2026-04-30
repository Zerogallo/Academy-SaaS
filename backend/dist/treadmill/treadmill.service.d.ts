import { Repository } from 'typeorm';
import { TreadmillSession } from './treadmill.entity';
import { UsersService } from '../users/users.service';
export declare class TreadmillService {
    private treadmillRepository;
    private usersService;
    constructor(treadmillRepository: Repository<TreadmillSession>, usersService: UsersService);
    startTreadmill(userId: number): Promise<TreadmillSession>;
    endTreadmill(userId: number): Promise<TreadmillSession>;
    getActiveSession(userId: number): Promise<TreadmillSession | null>;
}
