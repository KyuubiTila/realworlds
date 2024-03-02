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
exports.ArticleController = void 0;
const common_1 = require("@nestjs/common");
const article_service_1 = require("./article.service");
const create_article_dto_1 = require("./dto/create-article.dto");
const get_authenticated_user_decorator_1 = require("../auth/get-authenticated-user.decorator");
const user_entity_1 = require("../auth/user.entity");
const passport_1 = require("@nestjs/passport");
const update_article_dto_1 = require("./dto/update-article.dto");
let ArticleController = class ArticleController {
    constructor(articleService) {
        this.articleService = articleService;
    }
    async createArticle(user, createArticleDto) {
        try {
            return await this.articleService.createArticle(user, createArticleDto);
        }
        catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new common_1.ConflictException('Article with this slug already exists');
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to create article ' + error);
            }
        }
    }
    async getArticleById(id) {
        try {
            return await this.articleService.getArticleById(id);
        }
        catch (error) {
            throw new common_1.NotFoundException('Failed to fetch article');
        }
    }
    async getAllArticles() {
        try {
            return await this.articleService.getAllArticles();
        }
        catch (error) {
            throw new common_1.NotFoundException('Failed to fetch articles');
        }
    }
    async updateArticle(id, updateArticleDto) {
        try {
            return await this.articleService.updateArticle(id, updateArticleDto);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to update article');
        }
    }
    async deleteArticle(user, id) {
        try {
            await this.articleService.deleteArticle(id, user);
        }
        catch (error) {
            throw new common_1.NotFoundException('Failed to delete article');
        }
    }
    async toggleLike(user, articleId) {
        try {
            return await this.articleService.toggleLike(articleId, user);
        }
        catch (error) {
            throw new common_1.NotFoundException('Failed to toggle like');
        }
    }
    async toggleUnlike(articleId, user) {
        try {
            return await this.articleService.toggleUnlike(articleId, user);
        }
        catch (error) {
            throw new common_1.NotFoundException('Failed to toggle unlike');
        }
    }
    async updateArticleFavoritesCount(articleId) {
        try {
            const result = await this.articleService.updateArticleFavoritesCountService(articleId);
            return result;
        }
        catch (error) {
            console.error('Error updating article favorites count:', error);
            throw new common_1.InternalServerErrorException('Error updating article favorites count');
        }
    }
    async getAllLikes(user) {
        return this.articleService.allLikesService(user);
    }
};
exports.ArticleController = ArticleController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, get_authenticated_user_decorator_1.GetAuthenticatedUser)()),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        create_article_dto_1.CreateArticleDto]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "createArticle", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getArticleById", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getAllArticles", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_article_dto_1.UpdateArticleDto]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "updateArticle", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, get_authenticated_user_decorator_1.GetAuthenticatedUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "deleteArticle", null);
__decorate([
    (0, common_1.Post)(':id/toggle-like'),
    __param(0, (0, get_authenticated_user_decorator_1.GetAuthenticatedUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "toggleLike", null);
__decorate([
    (0, common_1.Post)(':id/toggle-unlike'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, get_authenticated_user_decorator_1.GetAuthenticatedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "toggleUnlike", null);
__decorate([
    (0, common_1.Put)('/updateArticleFavoritesCount/:articleId'),
    __param(0, (0, common_1.Param)('articleId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "updateArticleFavoritesCount", null);
__decorate([
    (0, common_1.Get)('allLikes/getAll'),
    __param(0, (0, get_authenticated_user_decorator_1.GetAuthenticatedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "getAllLikes", null);
exports.ArticleController = ArticleController = __decorate([
    (0, common_1.Controller)('articles'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [article_service_1.ArticleService])
], ArticleController);
//# sourceMappingURL=article.controller.js.map