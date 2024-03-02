import { ArticleFavorited } from 'src/article_favorited/article-favourited.entity';
import { Article } from 'src/article/article.entity';
import { Comment } from 'src/comments/comment.entity';
import { Profile } from 'src/profile/profile.entity';
import { BaseEntity } from 'typeorm';
export declare class User extends BaseEntity {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    profile: Profile;
    favoritedArticles: ArticleFavorited[];
    articles: Article[];
    comments: Comment[];
    followers: User[];
    following: User[];
}
