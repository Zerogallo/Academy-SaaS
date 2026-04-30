import { Repository } from 'typeorm';
import { Checkin } from './checkin.entity';
import { UsersService } from '../users/users.service';
export declare class CheckinsService {
    private checkinsRepository;
    private usersService;
    constructor(checkinsRepository: Repository<Checkin>, usersService: UsersService);
    checkin(userId: number): Promise<Checkin>;
    checkout(userId: number): Promise<Checkin>;
    getActiveCheckin(userId: number): Promise<Checkin | null>;
}
