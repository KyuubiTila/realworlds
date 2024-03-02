import { BaseEntity } from 'typeorm';
import { Article } from '../article/article.entity';
export declare class Tag extends BaseEntity {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    article: Article;
}
