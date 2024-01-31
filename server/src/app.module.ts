import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { ArticleModule } from './article/article.module';
import { CommentsModule } from './comments/comments.module';
import { TagModule } from './tag/tag.module';
import { ArticleFavoritedModule } from './article_favorited/article_favorited.module';
import { FollowModule } from './follow/follow.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    ProfileModule,
    ArticleModule,
    CommentsModule,
    TagModule,
    ArticleFavoritedModule,
    FollowModule,
  ],
})
export class AppModule {}
