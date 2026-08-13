import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from './user.schema';
export interface JwtPayload {
    sub: string;
    email: string;
}
export declare class AuthService {
    private readonly userModel;
    private readonly jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<{
        _id: string;
        email: string;
    }>;
    login(user: {
        _id: string;
        email: string;
    }): Promise<{
        access_token: string;
    }>;
    verifyToken(token: string): Promise<JwtPayload>;
    getProfile(userId: string): Promise<{
        _id: import("mongoose").Types.ObjectId;
        email: string;
        name: string;
    }>;
    updateProfile(userId: string, dto: {
        name?: string;
        email?: string;
        currentPassword?: string;
        newPassword?: string;
    }): Promise<{
        _id: import("mongoose").Types.ObjectId;
        email: string;
        name: string;
    }>;
}
