// src/app.module.ts – core NestJS module
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { LandsModule } from './lands/lands.module';
import { VideosModule } from './videos/videos.module';
import { UploadModule } from './upload/upload.module';
import { HeroModule } from './hero/hero.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/pgi3drelators'),
    AuthModule,
    PagesModule,
    LandsModule,
    VideosModule,
    UploadModule,
    HeroModule,
  ],
})
export class AppModule {}