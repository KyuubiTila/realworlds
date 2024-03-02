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
exports.AuthService = void 0;
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("./user.entity");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async hashPassword(password) {
        return bcrypt.hash(password, 10);
    }
    async signUpService(registerCredentialDto) {
        const { username, email, password } = registerCredentialDto;
        const existingUser = await this.userRepository.findOne({
            where: [{ username }, { email }],
        });
        if (existingUser) {
            throw new common_1.BadRequestException('Username or email already exists');
        }
        const user = new user_entity_1.User();
        user.username = username;
        user.email = email;
        user.password = await this.hashPassword(password);
        try {
            await this.userRepository.save(user);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message || 'Internal Server Error');
        }
    }
    async getUserByIdService(id) {
        const found = await this.userRepository.findOne({
            where: { id },
            relations: ['following', 'followers'],
        });
        if (!found) {
            throw new common_1.NotFoundException(`User with ${id} not found`);
        }
        return found;
    }
    async updateUserByIdService(id, userUpdateDto) {
        const { username, password } = userUpdateDto;
        try {
            const user = await this.getUserByIdService(id);
            user.username = username;
            user.password = password;
            await this.userRepository.save(user);
            return user;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException(`User with ID ${id} not found`);
            }
            else if (error instanceof common_1.BadRequestException) {
                throw new common_1.BadRequestException(error.message);
            }
            else {
                throw error;
            }
        }
    }
    async deleteUserByIdService(id) {
        try {
            const user = await this.getUserByIdService(id);
            await this.userRepository.remove(user);
        }
        catch (error) {
            if (error.name === 'EntityNotFound') {
                throw new common_1.NotFoundException(`User with ID ${id} not found`);
            }
            throw error;
        }
    }
    async getAllUserService() {
        const users = await this.userRepository.find();
        return users;
    }
    async validateUserPassword(loginCredentialDto) {
        const { username, password } = loginCredentialDto;
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid login credentials');
        }
        const payload = { username };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map