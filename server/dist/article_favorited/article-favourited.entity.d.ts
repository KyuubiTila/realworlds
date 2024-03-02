import { BaseEntity } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Article } from 'src/article/article.entity';
export declare class ArticleFavorited extends BaseEntity {
    id: number;
    user: User;
    article: Article;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    articleId: number;
}
