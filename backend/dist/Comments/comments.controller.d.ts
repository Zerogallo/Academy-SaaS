import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/comment.dto';
import { ReactionDto } from './dto/reaction.dto';
export declare class CommentsController {
    private commentsService;
    constructor(commentsService: CommentsService);
    getMyComment(req: any): Promise<import("./comment.entity").Comment>;
    getAllComments(): Promise<import("./comment.entity").Comment[]>;
    createOrUpdateComment(req: any, createCommentDto: CreateCommentDto): Promise<import("./comment.entity").Comment>;
    reactToComment(id: number, req: any, reactionDto: ReactionDto): Promise<import("./comment.entity").Comment>;
}
