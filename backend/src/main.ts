// src/main.ts – NestJS entry point
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Serve static uploads
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  app.enableCors({
    origin: ['https://www.pgirealtors.com', 'https://pgirealtors.com'],
    credentials: true,
  });

  const port = Number(process.env.NEST_PORT) || 4000;
  await app.listen(port);
  console.log(`🚀 Backend listening on http://localhost:${port}`);
}
bootstrap();