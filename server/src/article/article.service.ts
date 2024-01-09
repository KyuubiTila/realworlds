import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleFavorited } from 'src/article/article-favourited.entity';
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
    @InjectRepository(ArticleFavorited)
    private articleFavoritedRepository: Repository<ArticleFavorited>,
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

  async getArticleById(id: number): Promise<Article> {
    try {
      const article = await this.articleRepository.findOne({
        where: { id },
        relations: ['user'],
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
      const articles = await this.articleRepository.find({
        relations: ['user'], // Add this to populate the user details
      });
      return articles;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch articles');
    }
  }

  async updateArticle(
    id: number,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    try {
      const { slug, title, description, body, taglist } = updateArticleDto;
      const existingArticle = await this.getArticleById(id);

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

  async toggleLike(articleId: number, user: User): Promise<Article> {
    try {
      const article = await this.getArticleById(articleId);

      if (!article) {
        throw new NotFoundException('article not found');
      }

      const isLiked = await this.articleFavoritedRepository.findOne({
        where: {
          userId: user.id,
          articleId: articleId,
        },
      });

      if (isLiked) {
        throw new ConflictException('Article is liked');
      } else {
        // User has not liked the article, so like it
        const newFavorite = this.articleFavoritedRepository.create({
          user,
          article,
        });
        await this.articleFavoritedRepository.save(newFavorite);
      }

      await article.reload();

      return article;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      } else {
        throw new InternalServerErrorException(
          'Error toggling like on article',
        );
      }
    }
  }

  async toggleUnlike(articleId: number, user: User): Promise<Article> {
    try {
      const article = await this.getArticleById(articleId);

      if (!article) {
        throw new NotFoundException('article not found');
      }

      const isLiked = await this.articleFavoritedRepository.findOne({
        where: {
          userId: user.id,
          articleId: articleId,
        },
      });

      if (!isLiked) {
        throw new NotFoundException('Article is not liked');
      } else {
        // User has liked the article, so unlike it
        await this.articleFavoritedRepository.remove(isLiked);
      }

      await article.reload();

      return article;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException(
          'Error toggling unlike on article',
        );
      }
    }
  }

  async updateArticleFavoritesCountService(
    articleId: number,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const count = await this.articleFavoritedRepository.count({
        where: { articleId },
      });
      await this.articleRepository.update(
        { id: articleId },
        { favouritesCount: count },
      );

      return {
        success: true,
        message: 'Article favorite count updated successfully',
      };
    } catch (error) {
      console.error('Error updating article favorite count:', error);
      throw new InternalServerErrorException(
        'Error updating article favorite count',
      );
    }
  }

  async allLikesService(user: User): Promise<ArticleFavorited[]> {
    try {
      const userLikes = await this.articleFavoritedRepository.find({
        where: { userId: user.id },
      });

      return userLikes;
    } catch (error) {
      console.error('Error fetching user likes:', error);
      throw new InternalServerErrorException('Error fetching user likes');
    }
  }
}
