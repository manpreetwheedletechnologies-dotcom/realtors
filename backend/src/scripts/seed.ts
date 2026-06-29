import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { PagesService } from '../pages/pages.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const pagesService = app.get(PagesService);

  const exists = await pagesService.findBySlug('home').catch(() => null);
  if (!exists) {
    await pagesService.create({
      slug: 'home',
      title: 'Welcome to 3DBharat Clone',
      htmlContent: `<h1>3DBharat Clone</h1><p>This is placeholder content. Replace with real scraped HTML.</p>`,
    });
    console.log('✅ Seeded home page');
  } else {
    console.log('⚡ Home page already exists');
  }
  await app.close();
}
bootstrap();
