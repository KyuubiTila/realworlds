import { BaseEntity } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { Article } from 'src/article/article.entity';
export declare class Comment extends BaseEntity {
    id: number;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    article: Article;
    userId: number;
    articleId: number;
}
