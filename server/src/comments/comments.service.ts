import { Injectable, NotFoundException } from '@nestjs/common';
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
    user: User,
    articleId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const { body } = createCommentDto;

    const comment = this.commentRepository.create({
      body,
      articleId,
      user,
    });

    return comment;
  }

  async getCommentById(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({ where: { id } });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }

  async getAllComments(): Promise<Comment[]> {
    return await this.commentRepository.find();
  }

  async updateComment(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const { body } = updateCommentDto;

    const comment = await this.getCommentById(id);

    comment.body = body;

    return comment;
  }

  async deleteComment(id: number): Promise<void> {
    const comment = await this.getCommentById(id);

    await this.commentRepository.remove(comment);
  }

  async getArticleCommentsById(articleId: number): Promise<Comment[]> {
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
  }
}
