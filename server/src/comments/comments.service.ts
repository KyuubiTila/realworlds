import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from '../auth/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async createComment(
    articleId: number,
    user: User,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    try {
      const { body } = createCommentDto;

      const comment = this.commentRepository.create({
        body,
        articleId,
        user,
      });

      return await this.commentRepository.save(comment);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create comment');
    }
  }

  async getCommentById(id: number): Promise<Comment> {
    try {
      const comment = await this.commentRepository.findOne({ where: { id } });

      if (!comment) {
        throw new NotFoundException('Comment not found');
      }

      return comment;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch comment');
    }
  }

  async getAllComments(): Promise<Comment[]> {
    try {
      return await this.commentRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch comments');
    }
  }

  async updateComment(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    try {
      const { body } = updateCommentDto;

      const comment = await this.getCommentById(id);

      comment.body = body;

      return await this.commentRepository.save(comment);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException('Failed to update comment');
      }
    }
  }

  async deleteComment(id: number): Promise<void> {
    try {
      const comment = await this.getCommentById(id);

      await this.commentRepository.remove(comment);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException('Failed to delete comment');
      }
    }
  }

  async getArticleCommentsById(articleId: number): Promise<Comment[]> {
    try {
      const comments = await this.commentRepository.find({
        where: { articleId },
        relations: ['user'],
      });

      if (!comments || comments.length === 0) {
        throw new NotFoundException(
          'No comments found for the specified article',
        );
      }

      return comments;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch article comments',
      );
    }
  }
}
