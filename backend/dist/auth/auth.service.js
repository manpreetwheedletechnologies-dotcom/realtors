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
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const user_schema_1 = require("./user.schema");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.userModel.findOne({ email }).exec();
        if (user && user.password === password) {
            return { _id: user._id.toString(), email: user.email };
        }
        return null;
    }
    async login(user) {
        const payload = { sub: user._id, email: user.email };
        return { access_token: this.jwtService.sign(payload) };
    }
    async verifyToken(token) {
        try {
            return this.jwtService.verify(token);
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
    async getProfile(userId) {
        const user = await this.userModel.findById(userId).select('-password').exec();
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return { _id: user._id, email: user.email, name: user.name };
    }
    async updateProfile(userId, dto) {
        const user = await this.userModel.findById(userId).exec();
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (dto.name !== undefined)
            user.name = dto.name;
        if (dto.email !== undefined && dto.email !== user.email) {
            const existing = await this.userModel.findOne({ email: dto.email }).exec();
            if (existing && existing._id.toString() !== userId) {
                throw new common_1.BadRequestException('That email is already in use.');
            }
            user.email = dto.email;
        }
        if (dto.newPassword) {
            if (!dto.currentPassword || dto.currentPassword !== user.password) {
                throw new common_1.BadRequestException('Current password is incorrect.');
            }
            if (dto.newPassword.length < 6) {
                throw new common_1.BadRequestException('New password must be at least 6 characters.');
            }
            user.password = dto.newPassword;
        }
        await user.save();
        return { _id: user._id, email: user.email, name: user.name };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map