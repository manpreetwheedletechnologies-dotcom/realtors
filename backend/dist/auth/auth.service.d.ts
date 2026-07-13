import { JwtService } from '@nestjs/jwt';
export interface JwtPayload {
    sub: string;
    email: string;
}
export declare class AuthService {
    private readonly jwtService;
    private readonly admin;
    constructor(jwtService: JwtService);
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
}
