import { Controller, Get, Post, Put, Body, UseGuards, Request, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/comment.dto';
import { ReactionDto } from './dto/reaction.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('comments')
@UseGuards(AuthGuard('jwt'))
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get('me')
  async getMyComment(@Request() req) {
    return this.commentsService.getCommentByUserId(req.user.userId);
  }

  @Get('all')
  async getAllComments() {
    return this.commentsService.getAllComments();
  }

  @Post('me')
  async createOrUpdateComment(@Request() req, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.createOrUpdate(req.user.userId, createCommentDto);
  }

  @Post(':id/react')
  async reactToComment(@Param('id') id: number, @Request() req, @Body() reactionDto: ReactionDto) {
    return this.commentsService.reactToComment(id, req.user.userId, reactionDto);
  }
}