import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findById(id: number): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    create(userData: Partial<User>): Promise<User>;
    updateEvaluation(userId: number): Promise<User>;
    needsEvaluation(userId: number): Promise<boolean>;
    updatePhoto(userId: number, photoPath: string): Promise<User>;
}
