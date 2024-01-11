import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleFavorited } from './article-favourited.entity';
import { ArticleFavoritedController } from './article_favorited.controller';
import { ArticleFavoritedService } from './article_favorited.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleFavorited])],

  controllers: [ArticleFavoritedController],
  providers: [ArticleFavoritedService],
})
export class ArticleFavoritedModule {}
