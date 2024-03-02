import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
  NotFoundException,
  InternalServerErrorException,
  Delete,
  Patch,
  ConflictException,
  Put,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './article.entity';
import { GetAuthenticatedUser } from 'src/auth/get-authenticated-user.decorator';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleFavorited } from '../article_favorited/article-favourited.entity';

@Controller('articles')
@UseGuards(AuthGuard())
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async createArticle(
    @GetAuthenticatedUser() user: User,
    @Body(ValidationPipe) createArticleDto: CreateArticleDto,
  ): Promise<Article> {
    try {
      return await this.articleService.createArticle(user, createArticleDto);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Article with this slug already exists');
      } else {
        throw new InternalServerErrorException(
          'Failed to create article ' + error,
        );
      }
    }
  }

  @Get(':id')
  async getArticleById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Article> {
    try {
      return await this.articleService.getArticleById(id);
    } catch (error) {
      throw new NotFoundException('Failed to fetch article');
    }
  }

  @Get()
  async getAllArticles(): Promise<Article[]> {
    try {
      return await this.articleService.getAllArticles();
    } catch (error) {
      throw new NotFoundException('Failed to fetch articles');
    }
  }

  @Patch(':id')
  async updateArticle(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    try {
      return await this.articleService.updateArticle(id, updateArticleDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update article');
    }
  }

  @Delete(':id')
  async deleteArticle(
    @GetAuthenticatedUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    try {
      await this.articleService.deleteArticle(id, user);
    } catch (error) {
      throw new NotFoundException('Failed to delete article');
    }
  }

  @Post(':id/toggle-like')
  async toggleLike(
    @GetAuthenticatedUser() user: User,
    @Param('id', ParseIntPipe) articleId: number,
  ) {
    try {
      return await this.articleService.toggleLike(articleId, user);
    } catch (error) {
      throw new NotFoundException('Failed to toggle like');
    }
  }

  @Post(':id/toggle-unlike')
  async toggleUnlike(
    @Param('id', ParseIntPipe) articleId: number,
    @GetAuthenticatedUser() user: User,
  ) {
    try {
      return await this.articleService.toggleUnlike(articleId, user);
    } catch (error) {
      throw new NotFoundException('Failed to toggle unlike');
    }
  }

  @Put('/updateArticleFavoritesCount/:articleId')
  async updateArticleFavoritesCount(
    @Param('articleId') articleId: number,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const result =
        await this.articleService.updateArticleFavoritesCountService(articleId);

      return result;
    } catch (error) {
      // Handle exceptions as needed
      console.error('Error updating article favorites count:', error);
      throw new InternalServerErrorException(
        'Error updating article favorites count',
      );
    }
  }

  @Get('allLikes/getAll')
  async getAllLikes(
    @GetAuthenticatedUser() user: User,
  ): Promise<ArticleFavorited[]> {
    return this.articleService.allLikesService(user);
  }
}
