import { ArticleFavorited } from 'src/article_favorited/article-favourited.entity';
import { User } from 'src/auth/user.entity';
import { Comment } from 'src/comments/comment.entity';
import { BaseEntity } from 'typeorm';
import { Tag } from '../tag/tag.entity';
export declare class Article extends BaseEntity {
    id: number;
    slug: string;
    title: string;
    description: string;
    body: string;
    taglist: string;
    favouritesCount: number;
    createdAt: Date;
    updatedAt: Date;
    tags: Tag[];
    user: User;
    favoritedBy: ArticleFavorited[];
    comments: Comment[];
    userId: number;
}
