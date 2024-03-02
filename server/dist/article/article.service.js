"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const article_favourited_entity_1 = require("../article_favorited/article-favourited.entity");
const typeorm_2 = require("typeorm");
const article_entity_1 = require("./article.entity");
let ArticleService = class ArticleService {
    constructor(articleRepository, articleFavoritedRepository) {
        this.articleRepository = articleRepository;
        this.articleFavoritedRepository = articleFavoritedRepository;
    }
    async createArticle(user, createArticleDto) {
        const { slug, title, description, body, taglist } = createArticleDto;
        const article = this.articleRepository.create({
            slug,
            title,
            description,
            body,
            taglist,
            favouritesCount: 0,
            userId: user.id,
        });
        return await this.articleRepository.save(article);
    }
    async getArticleById(id) {
        const article = await this.articleRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!article) {
            throw new common_1.NotFoundException('Article not found');
        }
        return article;
    }
    async getAllArticles() {
        const articles = await this.articleRepository.find({
            relations: ['user'],
        });
        return articles;
    }
    async updateArticle(id, updateArticleDto) {
        const { slug, title, description, body, taglist } = updateArticleDto;
        const existingArticle = await this.getArticleById(id);
        existingArticle.slug = slug;
        existingArticle.title = title;
        existingArticle.description = description;
        existingArticle.body = body;
        existingArticle.taglist = taglist;
        return await this.articleRepository.save(existingArticle);
    }
    async deleteArticle(id, user) {
        const article = await this.articleRepository.findOne({
            where: { id, userId: user.id },
        });
        if (!article) {
            throw new common_1.NotFoundException('Article not found');
        }
        if (article.userId !== user.id) {
            throw new common_1.ForbiddenException('You are not allowed to delete this article');
        }
        await this.articleRepository.remove(article);
    }
    async toggleLike(articleId, user) {
        const article = await this.articleRepository.findOne({
            where: { id: articleId },
        });
        if (!article) {
            throw new common_1.NotFoundException('article not found');
        }
        const isLiked = await this.articleFavoritedRepository.findOne({
            where: {
                userId: user.id,
                articleId: articleId,
            },
        });
        if (isLiked) {
            throw new common_1.ConflictException('Article is liked');
        }
        else {
            const newFavorite = this.articleFavoritedRepository.create({
                user,
                article,
            });
            await this.articleFavoritedRepository.save(newFavorite);
        }
        await article.reload();
        return article;
    }
    async toggleUnlike(articleId, user) {
        const article = await this.getArticleById(articleId);
        if (!article) {
            throw new common_1.NotFoundException('article not found');
        }
        const isLiked = await this.articleFavoritedRepository.findOne({
            where: {
                userId: user.id,
                articleId: articleId,
            },
        });
        if (!isLiked) {
            throw new common_1.NotFoundException('Article is not liked');
        }
        else {
            await this.articleFavoritedRepository.remove(isLiked);
        }
        await article.reload();
        return article;
    }
    async updateArticleFavoritesCountService(articleId) {
        const count = await this.articleFavoritedRepository.count({
            where: { articleId },
        });
        await this.articleRepository.update({ id: articleId }, { favouritesCount: count });
        return {
            success: true,
            message: 'Article favorite count updated successfully',
        };
    }
    async allLikesService(user) {
        const userLikes = await this.articleFavoritedRepository.find({
            where: { userId: user.id },
        });
        return userLikes;
    }
};
exports.ArticleService = ArticleService;
exports.ArticleService = ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(article_entity_1.Article)),
    __param(1, (0, typeorm_1.InjectRepository)(article_favourited_entity_1.ArticleFavorited)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ArticleService);
//# sourceMappingURL=article.service.js.map