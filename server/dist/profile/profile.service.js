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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const profile_entity_1 = require("./profile.entity");
let ProfileService = class ProfileService {
    constructor(profileRepository) {
        this.profileRepository = profileRepository;
    }
    async createProfile(user, createProfileDto) {
        try {
            const { bio, image } = createProfileDto;
            const profile = new profile_entity_1.Profile();
            profile.user = user;
            profile.bio = bio;
            profile.image = image;
            return await this.profileRepository.save(profile);
        }
        catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new common_1.HttpException('Profile already exists for this user', common_1.HttpStatus.CONFLICT);
            }
            else {
                throw new common_1.HttpException('Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    async getProfileById(id, user) {
        const profile = await this.profileRepository.findOne({
            where: { id, userId: user.id },
            relations: ['user', 'user.following', 'user.followers'],
        });
        if (!profile) {
            throw new common_1.NotFoundException('Profile not found');
        }
        return profile;
    }
    async updateProfile(id, user, updateProfileDto) {
        const profile = await this.getProfileById(id, user);
        if (!profile) {
            throw new common_1.NotFoundException('Profile not found');
        }
        if (updateProfileDto.bio !== undefined) {
            profile.bio = updateProfileDto.bio;
        }
        if (updateProfileDto.image !== undefined) {
            profile.image = updateProfileDto.image;
        }
        return await this.profileRepository.save(profile);
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(profile_entity_1.Profile)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProfileService);
//# sourceMappingURL=profile.service.js.map