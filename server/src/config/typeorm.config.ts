import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import { ArticleFavorited } from 'src/article_favorited/article-favourited.entity';
import { Article } from 'src/article/article.entity';
import { Tag } from 'src/tag/tag.entity';
import { User } from 'src/auth/user.entity';
import { Comment } from 'src/comments/comment.entity';
import { Profile } from 'src/profile/profile.entity';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: process.env.RDS_TYPE || dbConfig.type,
  host: process.env.RDS_HOSTNAME || dbConfig.host,
  port: process.env.RDS_PORT || dbConfig.port,
  username: process.env.RDS_USERNAME || dbConfig.username,
  password: process.env.RDS_PASSWORD || dbConfig.password,
  database: process.env.RDS_DB_NAME || dbConfig.database,
  entities: [User, Profile, Article, Tag, ArticleFavorited, Comment],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
  // Enable SSL
  ssl: process.env.TYPEORM_SSL || dbConfig.ssl,
};
