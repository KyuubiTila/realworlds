import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { Article } from './article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ArticleFavorited } from 'src/article/article-favourited.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, ArticleFavorited]), AuthModule],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
