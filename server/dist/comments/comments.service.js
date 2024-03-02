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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("./comment.entity");
let CommentService = class CommentService {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }
    async createComment(user, articleId, createCommentDto) {
        const { body } = createCommentDto;
        const comment = this.commentRepository.create({
            body,
            articleId,
            userId: user.id,
        });
        return await this.commentRepository.save(comment);
    }
    async getCommentById(id) {
        const comment = await this.commentRepository.findOne({ where: { id } });
        if (!comment) {
            throw new common_1.NotFoundException('Comment not found');
        }
        return comment;
    }
    async getAllComments() {
        return await this.commentRepository.find();
    }
    async updateComment(id, updateCommentDto) {
        const { body } = updateCommentDto;
        const comment = await this.getCommentById(id);
        comment.body = body;
        return await this.commentRepository.save(comment);
    }
    async deleteComment(id) {
        const comment = await this.getCommentById(id);
        await this.commentRepository.remove(comment);
    }
    async getArticleCommentsById(articleId) {
        const comments = await this.commentRepository.find({
            where: { articleId },
            relations: ['user'],
        });
        if (!comments || comments.length === 0) {
            throw new common_1.NotFoundException('No comments found for the specified article');
        }
        return comments;
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CommentService);
//# sourceMappingURL=comments.service.js.map