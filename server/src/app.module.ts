import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    ProfileModule,
    ArticleModule,
  ],
})
export class AppModule {}
