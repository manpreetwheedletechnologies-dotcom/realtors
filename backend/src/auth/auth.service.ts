import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface JwtPayload {
  sub: string; // user id
  email: string;
}

@Injectable()
export class AuthService {
  // Mock admin user – replace with real DB lookup later
  private readonly admin = {
    _id: 'admin-id-123',
    email: 'admin@3dbharat.com',
    password: 'adminpass', // never store plain passwords in production
  };

  constructor(private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    if (email === this.admin.email && password === this.admin.password) {
      const { password, ...result } = this.admin;
      return result;
    }
    return null;
  }

  async login(user: { _id: string; email: string }) {
    const payload: JwtPayload = { sub: user._id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }

  async verifyToken(token: string): Promise<JwtPayload> {
    try {
      return this.jwtService.verify<JwtPayload>(token);
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
