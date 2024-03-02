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
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
const common_1 = require("@nestjs/common");
const register_credential_dto_1 = require("./dto/register-credential.dto");
const user_update_dto_1 = require("./dto/user-update.dto");
const login_credential_dto_1 = require("./dto/login-credential.dto");
const passport_1 = require("@nestjs/passport");
const get_authenticated_user_decorator_1 = require("./get-authenticated-user.decorator");
const user_entity_1 = require("./user.entity");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signUp(registerCredentialDto) {
        return this.authService.signUpService(registerCredentialDto);
    }
    getUserById(id) {
        return this.authService.getUserByIdService(id);
    }
    updateUserById(id, userUpdateDto) {
        return this.authService.updateUserByIdService(id, userUpdateDto);
    }
    async deleteUserById(id) {
        await this.authService.deleteUserByIdService(id);
    }
    getAllUsers() {
        return this.authService.getAllUserService();
    }
    signIn(loginCredentialDto) {
        return this.authService.validateUserPassword(loginCredentialDto);
    }
    async getProfile(user) {
        return { user };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/signUp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_credential_dto_1.RegisterCredentialDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_update_dto_1.UserUpdateDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updateUserById", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteUserById", null);
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Post)('/signIn'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_credential_dto_1.LoginCredentialDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)('/profile'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, get_authenticated_user_decorator_1.GetAuthenticatedUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map