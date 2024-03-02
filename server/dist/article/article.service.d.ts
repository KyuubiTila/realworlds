import { ArticleFavorited } from 'src/article_favorited/article-favourited.entity';
import { User } from 'src/auth/user.entity';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
export declare class ArticleService {
    private articleRepository;
    private articleFavoritedRepository;
    constructor(articleRepository: Repository<Article>, articleFavoritedRepository: Repository<ArticleFavorited>);
    createArticle(user: User, createArticleDto: CreateArticleDto): Promise<Article>;
    getArticleById(id: number): Promise<Article>;
    getAllArticles(): Promise<Article[]>;
    updateArticle(id: number, updateArticleDto: UpdateArticleDto): Promise<Article>;
    deleteArticle(id: number, user: User): Promise<void>;
    toggleLike(articleId: number, user: User): Promise<Article>;
    toggleUnlike(articleId: number, user: User): Promise<Article>;
    updateArticleFavoritesCountService(articleId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    allLikesService(user: User): Promise<ArticleFavorited[]>;
}
