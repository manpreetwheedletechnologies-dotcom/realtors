import { AuthService } from './auth.service';
declare class LoginDto {
    email: string;
    password: string;
}
declare class UpdateProfileDto {
    name?: string;
    email?: string;
    currentPassword?: string;
    newPassword?: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): Promise<{
        _id: import("mongoose").Types.ObjectId;
        email: string;
        name: string;
    }>;
    updateProfile(req: any, dto: UpdateProfileDto): Promise<{
        _id: import("mongoose").Types.ObjectId;
        email: string;
        name: string;
    }>;
}
export {};
