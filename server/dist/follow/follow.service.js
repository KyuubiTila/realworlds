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
exports.FollowService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../auth/user.entity");
let FollowService = class FollowService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async follow(userId, user) {
        const userToBeFollowed = await this.usersRepository.findOne({
            where: { id: userId },
            relations: ['followers'],
        });
        const authenticatedUserFollowing = await this.usersRepository.findOne({
            where: { id: user.id },
            relations: ['following'],
        });
        if (!userToBeFollowed || !authenticatedUserFollowing) {
            throw new common_1.NotFoundException('User not found or follower not authenticated');
        }
        if (userToBeFollowed.id === authenticatedUserFollowing.id) {
            throw new common_1.NotAcceptableException('You cannot follow yourself');
        }
        const isUserToBeFollowedAlreadyFollowed = userToBeFollowed.followers.some((follower) => follower.id === authenticatedUserFollowing.id);
        if (isUserToBeFollowedAlreadyFollowed) {
            throw new common_1.NotAcceptableException('You already follow this user');
        }
        userToBeFollowed.followers.push(authenticatedUserFollowing);
        authenticatedUserFollowing.following.push(userToBeFollowed);
        await this.usersRepository.save(userToBeFollowed);
        await this.usersRepository.save(authenticatedUserFollowing);
    }
    async unfollow(userId, user) {
        const userToBeUnfollowed = await this.usersRepository.findOne({
            where: { id: userId },
            relations: ['followers'],
        });
        const authenticatedUserUnfollowing = await this.usersRepository.findOne({
            where: { id: user.id },
            relations: ['following'],
        });
        if (!userToBeUnfollowed || !authenticatedUserUnfollowing) {
            throw new common_1.NotFoundException('User or unfollower not found');
        }
        userToBeUnfollowed.followers = userToBeUnfollowed.followers.filter((follower) => follower.id !== authenticatedUserUnfollowing.id);
        authenticatedUserUnfollowing.following =
            authenticatedUserUnfollowing.following.filter((followedUser) => followedUser.id !== userToBeUnfollowed.id);
        await this.usersRepository.save(userToBeUnfollowed);
        await this.usersRepository.save(authenticatedUserUnfollowing);
    }
};
exports.FollowService = FollowService;
exports.FollowService = FollowService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FollowService);
//# sourceMappingURL=follow.service.js.map