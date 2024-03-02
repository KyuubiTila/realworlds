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
exports.FollowController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const get_authenticated_user_decorator_1 = require("../auth/get-authenticated-user.decorator");
const user_entity_1 = require("../auth/user.entity");
const follow_service_1 = require("./follow.service");
let FollowController = class FollowController {
    constructor(followService) {
        this.followService = followService;
    }
    async follow(userId, user) {
        await this.followService.follow(userId, user);
    }
    async unfollow(userId, user) {
        await this.followService.unfollow(userId, user);
    }
};
exports.FollowController = FollowController;
__decorate([
    (0, common_1.Post)(':userId/follow'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, get_authenticated_user_decorator_1.GetAuthenticatedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "follow", null);
__decorate([
    (0, common_1.Post)(':userId/unfollow'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, get_authenticated_user_decorator_1.GetAuthenticatedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], FollowController.prototype, "unfollow", null);
exports.FollowController = FollowController = __decorate([
    (0, common_1.Controller)('follow'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [follow_service_1.FollowService])
], FollowController);
//# sourceMappingURL=follow.controller.js.map