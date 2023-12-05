import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CommentService } from './comments.service';
import { CommentController } from './comments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), AuthModule],

  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentsModule {}
