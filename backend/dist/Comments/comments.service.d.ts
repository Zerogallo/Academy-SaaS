import { Repository } from 'typeorm';
import { Comment } from './Comment.entity';
import { CreateCommentDto } from './dto/comment.dto';
import { ReactionDto } from './dto/reaction.dto';
export declare class CommentsService {
    private commentsRepository;
    constructor(commentsRepository: Repository<Comment>);
    createOrUpdate(userId: number, createCommentDto: CreateCommentDto): Promise<Comment>;
    getCommentByUserId(userId: number): Promise<Comment | null>;
    getAllComments(): Promise<Comment[]>;
    reactToComment(commentId: number, userId: number, reactionDto: ReactionDto): Promise<Comment>;
}
