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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleFavorited = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../auth/user.entity");
const article_entity_1 = require("../article/article.entity");
let ArticleFavorited = class ArticleFavorited extends typeorm_1.BaseEntity {
};
exports.ArticleFavorited = ArticleFavorited;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ArticleFavorited.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.favoritedArticles),
    __metadata("design:type", user_entity_1.User)
], ArticleFavorited.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => article_entity_1.Article, (article) => article.favoritedBy),
    __metadata("design:type", article_entity_1.Article)
], ArticleFavorited.prototype, "article", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ArticleFavorited.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], ArticleFavorited.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ArticleFavorited.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ArticleFavorited.prototype, "articleId", void 0);
exports.ArticleFavorited = ArticleFavorited = __decorate([
    (0, typeorm_1.Entity)('article_favorited')
], ArticleFavorited);
//# sourceMappingURL=article-favourited.entity.js.map