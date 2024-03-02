"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleFavoritedModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const article_favourited_entity_1 = require("./article-favourited.entity");
const article_favorited_controller_1 = require("./article_favorited.controller");
const article_favorited_service_1 = require("./article_favorited.service");
let ArticleFavoritedModule = class ArticleFavoritedModule {
};
exports.ArticleFavoritedModule = ArticleFavoritedModule;
exports.ArticleFavoritedModule = ArticleFavoritedModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([article_favourited_entity_1.ArticleFavorited])],
        controllers: [article_favorited_controller_1.ArticleFavoritedController],
        providers: [article_favorited_service_1.ArticleFavoritedService],
    })
], ArticleFavoritedModule);
//# sourceMappingURL=article_favorited.module.js.map