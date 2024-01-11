import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Delete,
  UseGuards,
  InternalServerErrorException,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetAuthenticatedUser } from '../auth/get-authenticated-user.decorator';
import { CommentService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
@UseGuards(AuthGuard())
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post(':articleId')
  async createComment(
    @GetAuthenticatedUser() user: User,
    @Param('articleId') articleId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    try {
      return await this.commentService.createComment(
        user,
        articleId,
        createCommentDto,
      );
    } catch (error) {
      throw new InternalServerErrorException('Failed to create comment');
    }
  }

  @Get(':id')
  async getComment(@Param('id') id: number) {
    try {
      return await this.commentService.getCommentById(id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch comment');
    }
  }

  @Get()
  async getAllComments() {
    try {
      return await this.commentService.getAllComments();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch comments');
    }
  }

  @Patch(':id')
  async updateComment(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    try {
      return await this.commentService.updateComment(id, updateCommentDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update comment');
    }
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: number) {
    try {
      return await this.commentService.deleteComment(id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete comment');
    }
  }

  @Get('article/:id')
  async getArticleCommentsById(@Param('id') articleId: number) {
    try {
      return await this.commentService.getArticleCommentsById(articleId);
    } catch (error) {
      return { error: error.message };
    }
  }
}
