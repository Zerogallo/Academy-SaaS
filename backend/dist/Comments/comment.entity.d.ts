import { User } from '../users/user.entity';
export declare class Comment {
    id: number;
    user: User;
    content: string;
    likes: number;
    dislikes: number;
    createdAt: Date;
}
