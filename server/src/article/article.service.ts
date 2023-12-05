import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

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
    try {
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
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Article with this slug already exists');
      } else {
        throw new InternalServerErrorException('Failed to create article');
      }
    }
  }

  async getArticleById(id: number, user: User): Promise<Article> {
    try {
      const article = await this.articleRepository.findOne({
        where: { id, userId: user.id },
      });

      if (!article) {
        throw new NotFoundException('Article not found');
      }

      return article;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch article');
    }
  }

  async getAllArticles(): Promise<Article[]> {
    try {
      const articles = await this.articleRepository.find();
      return articles;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch articles');
    }
  }

  async updateArticle(
    id: number,
    user: User,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    try {
      const { slug, title, description, body, taglist } = updateArticleDto;
      const existingArticle = await this.getArticleById(id, user);

      existingArticle.slug = slug;
      existingArticle.title = title;
      existingArticle.description = description;
      existingArticle.body = body;
      existingArticle.taglist = taglist;

      return await this.articleRepository.save(existingArticle);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException('Failed to update article');
      }
    }
  }

  async deleteArticle(id: number, user: User): Promise<void> {
    const article = await this.articleRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    // Ensure that only the article owner can delete it
    if (article.userId !== user.id) {
      throw new ForbiddenException(
        'You are not allowed to delete this article',
      );
    }

    await this.articleRepository.remove(article);
  }
}
