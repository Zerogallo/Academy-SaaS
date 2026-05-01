import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './Comment.entity';
import { User } from '../users/user.entity';
import { CreateCommentDto } from './dto/comment.dto';
import { ReactionDto } from './dto/reaction.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async createOrUpdate(userId: number, createCommentDto: CreateCommentDto): Promise<Comment> {
    let comment = await this.commentsRepository.findOne({ where: { user: { id: userId } } });
    if (comment) {
      comment.content = createCommentDto.content;
    } else {
      comment = this.commentsRepository.create({
        user: { id: userId },
        content: createCommentDto.content,
      });
    }
    return this.commentsRepository.save(comment);
  }

  async getCommentByUserId(userId: number): Promise<Comment | null> {
    return this.commentsRepository.findOne({ where: { user: { id: userId } }, relations: ['user'] });
  }

  async getAllComments(): Promise<Comment[]> {
    return this.commentsRepository.find({ relations: ['user'], order: { createdAt: 'DESC' } });
  }

  async reactToComment(commentId: number, userId: number, reactionDto: ReactionDto): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({ where: { id: commentId } });
    if (!comment) throw new NotFoundException('Comentário não encontrado');

    // Futuro: registrar quem reagiu para evitar múltiplas reações (mas simplificado por ora)
    if (reactionDto.type === 'like') {
      comment.likes += 1;
    } else {
      comment.dislikes += 1;
    }
    return this.commentsRepository.save(comment);
  }
}