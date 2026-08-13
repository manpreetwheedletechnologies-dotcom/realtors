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
import { LeadsModule } from './leads/leads.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb+srv://devclientg:SCpLNaejWusV7mcR@cluster0.vyinynw.mongodb.net/realtors'),
    AuthModule,
    PagesModule,
    LandsModule,
    VideosModule,
    UploadModule,
    HeroModule,
    LeadsModule,
  ],
})
export class AppModule {}