import { Repository } from 'typeorm';
import { Checkin } from '../checkins/checkin.entity';
import { TreadmillSession } from '../treadmill/treadmill.entity';
import { User } from '../users/user.entity';
export declare class RankingsService {
    private checkinsRepository;
    private treadmillRepository;
    private usersRepository;
    constructor(checkinsRepository: Repository<Checkin>, treadmillRepository: Repository<TreadmillSession>, usersRepository: Repository<User>);
    getRankingGeneral(period?: 'week' | 'month'): Promise<any[]>;
}
