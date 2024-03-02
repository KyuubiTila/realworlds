"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const config = require("config");
const article_favourited_entity_1 = require("../article_favorited/article-favourited.entity");
const article_entity_1 = require("../article/article.entity");
const tag_entity_1 = require("../tag/tag.entity");
const user_entity_1 = require("../auth/user.entity");
const comment_entity_1 = require("../comments/comment.entity");
const profile_entity_1 = require("../profile/profile.entity");
const dbConfig = config.get('db');
exports.typeOrmConfig = {
    type: dbConfig.type,
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: process.env.RDS_PORT || dbConfig.port,
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DB_NAME || dbConfig.database,
    entities: [user_entity_1.User, profile_entity_1.Profile, article_entity_1.Article, tag_entity_1.Tag, article_favourited_entity_1.ArticleFavorited, comment_entity_1.Comment],
    synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
};
//# sourceMappingURL=typeorm.config.js.map