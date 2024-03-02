import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './article.entity';
import { User } from 'src/auth/user.entity';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleFavorited } from '../article_favorited/article-favourited.entity';
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    createArticle(user: User, createArticleDto: CreateArticleDto): Promise<Article>;
    getArticleById(id: number): Promise<Article>;
    getAllArticles(): Promise<Article[]>;
    updateArticle(id: number, updateArticleDto: UpdateArticleDto): Promise<Article>;
    deleteArticle(user: User, id: number): Promise<void>;
    toggleLike(user: User, articleId: number): Promise<Article>;
    toggleUnlike(articleId: number, user: User): Promise<Article>;
    updateArticleFavoritesCount(articleId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    getAllLikes(user: User): Promise<ArticleFavorited[]>;
}
