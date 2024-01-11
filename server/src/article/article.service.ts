import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleFavorited } from 'src/article_favorited/article-favourited.entity';
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

  async getArticleById(id: number): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }

  async getAllArticles(): Promise<Article[]> {
    const articles = await this.articleRepository.find({
      relations: ['user'], // Add this to populate the user details
    });
    return articles;
  }

  async updateArticle(
    id: number,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const { slug, title, description, body, taglist } = updateArticleDto;
    const existingArticle = await this.getArticleById(id);

    existingArticle.slug = slug;
    existingArticle.title = title;
    existingArticle.description = description;
    existingArticle.body = body;
    existingArticle.taglist = taglist;

    return await this.articleRepository.save(existingArticle);
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
  }

  async toggleUnlike(articleId: number, user: User): Promise<Article> {
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
  }

  async updateArticleFavoritesCountService(
    articleId: number,
  ): Promise<{ success: boolean; message: string }> {
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
  }

  async allLikesService(user: User): Promise<ArticleFavorited[]> {
    const userLikes = await this.articleFavoritedRepository.find({
      where: { userId: user.id },
    });

    return userLikes;
  }
}
