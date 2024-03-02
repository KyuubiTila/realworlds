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
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const user_entity_1 = require("../auth/user.entity");
const get_authenticated_user_decorator_1 = require("../auth/get-authenticated-user.decorator");
const comments_service_1 = require("./comments.service");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const update_comment_dto_1 = require("./dto/update-comment.dto");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async createComment(user, articleId, createCommentDto) {
        try {
            return await this.commentService.createComment(user, articleId, createCommentDto);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to create comment');
        }
    }
    async getComment(id) {
        try {
            return await this.commentService.getCommentById(id);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to fetch comment');
            }
        }
    }
    async getAllComments() {
        try {
            return await this.commentService.getAllComments();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch comments');
        }
    }
    async updateComment(id, updateCommentDto) {
        try {
            return await this.commentService.updateComment(id, updateCommentDto);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to update comment');
            }
        }
    }
    async deleteComment(id) {
        try {
            return await this.commentService.deleteComment(id);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(error.message);
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to delete comment');
            }
        }
    }
    async getArticleCommentsById(articleId) {
        try {
            return await this.commentService.getArticleCommentsById(articleId);
        }
        catch (error) {
            return { error: error.message };
        }
    }
};
exports.CommentController = CommentController;
__decorate([
    (0, common_1.Post)(':articleId'),
    __param(0, (0, get_authenticated_user_decorator_1.GetAuthenticatedUser)()),
    __param(1, (0, common_1.Param)('articleId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number, create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "createComment", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getComment", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getAllComments", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_comment_dto_1.UpdateCommentDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "updateComment", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "deleteComment", null);
__decorate([
    (0, common_1.Get)('article/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getArticleCommentsById", null);
exports.CommentController = CommentController = __decorate([
    (0, common_1.Controller)('comments'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [comments_service_1.CommentService])
], CommentController);
//# sourceMappingURL=comments.controller.js.map