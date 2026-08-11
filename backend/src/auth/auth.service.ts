import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './user.schema';

export interface JwtPayload {
  sub: string; // user id
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email }).exec();
    if (user && user.password === password) {
      return { _id: user._id.toString(), email: user.email };
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
