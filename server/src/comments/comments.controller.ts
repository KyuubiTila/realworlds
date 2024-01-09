import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Delete,
  UseGuards,
  Put,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { CommentService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
@UseGuards(AuthGuard())
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post(':articleId')
  async createComment(
    @Param('articleId') articleId: number,
    @GetUser() user: User,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    try {
      return await this.commentService.createComment(
        articleId,
        user,
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
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException('Failed to fetch comment');
      }
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

  @Put(':id')
  async updateComment(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    try {
      return await this.commentService.updateComment(id, updateCommentDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException('Failed to update comment');
      }
    }
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: number) {
    try {
      return await this.commentService.deleteComment(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException('Failed to delete comment');
      }
    }
  }

  @Get('article/:id')
  async getArticleCommentsById(@Param('id') articleId: number) {
    try {
      return await this.commentService.getArticleCommentsById(articleId);
    } catch (error) {
      // Handle errors, for simplicity, just returning an error response
      return { error: error.message };
    }
  }
}
