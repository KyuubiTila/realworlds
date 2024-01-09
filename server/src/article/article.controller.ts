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
  Put,
  InternalServerErrorException,
  ConflictException,
  Delete,
  ForbiddenException,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './article.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleFavorited } from './article-favourited.entity';

@Controller('articles')
@UseGuards(AuthGuard())
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('create')
  async createArticle(
    @Body(ValidationPipe) createArticleDto: CreateArticleDto,
    @GetUser() user: User,
  ): Promise<Article> {
    try {
      return await this.articleService.createArticle(user, createArticleDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      } else if (error instanceof InternalServerErrorException) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException('Failed to create article');
    }
  }

  @Get(':id')
  async getArticleById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Article> {
    try {
      return await this.articleService.getArticleById(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
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

  @Put(':id')
  async updateArticle(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    try {
      return await this.articleService.updateArticle(id, updateArticleDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException('Failed to update article');
    }
  }

  @Delete(':id')
  async deleteArticle(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    try {
      await this.articleService.deleteArticle(id, user);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw new NotFoundException(error.message);
      }
      throw new NotFoundException('Failed to delete article');
    }
  }

  @Post(':id/toggle-like')
  async toggleLike(
    @Param('id', ParseIntPipe) articleId: number,
    @GetUser() user: User,
  ) {
    try {
      return await this.articleService.toggleLike(articleId, user);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException
      ) {
        throw new NotFoundException(error.message);
      }
      throw new NotFoundException('Failed to toggle like');
    }
  }

  @Post(':id/toggle-unlike')
  async toggleUnlike(
    @Param('id', ParseIntPipe) articleId: number,
    @GetUser() user: User,
  ) {
    try {
      return await this.articleService.toggleUnlike(articleId, user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new NotFoundException('Failed to toggle unlike');
    }
  }

  @Put('/updateArticleFavoritesCount/:articleId')
  @UseGuards(AuthGuard())
  async updateArticleFavoritesCount(
    @Param('articleId') articleId: number,
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Call the updateArticleFavoritesCountService method
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
  async getAllLikes(@GetUser() user: User): Promise<ArticleFavorited[]> {
    return this.articleService.allLikesService(user);
  }
}
