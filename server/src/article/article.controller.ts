import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './article.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('articles')
@UseGuards(AuthGuard())
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('create')
  createArticle(
    @Body(ValidationPipe) createArticleDto: CreateArticleDto,
    @GetUser() user: User,
  ): Promise<Article> {
    return this.articleService.createArticle(user, createArticleDto);
  }
}
