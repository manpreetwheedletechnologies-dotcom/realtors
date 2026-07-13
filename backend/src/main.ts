// src/main.ts – NestJS entry point
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });

  const port = process.env.NEST_PORT || 4000;
  await app.listen(port);
  console.log(`🚀 Backend listening on http://localhost:${port}`);
}
bootstrap();