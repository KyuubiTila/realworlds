import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async createArticle(
    user: User,
    createArticleDto: CreateArticleDto,
  ): Promise<Article> {
    const { slug, title, description, body, taglist } = createArticleDto;

    const article = this.articleRepository.create({
      slug,
      title,
      description,
      body,
      taglist,
      favouritesCount: 0,
      userId: user.id,
    });

    return await this.articleRepository.save(article);
  }
}
