"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const pages_service_1 = require("../pages/pages.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const pagesService = app.get(pages_service_1.PagesService);
    const exists = await pagesService.findBySlug('home').catch(() => null);
    if (!exists) {
        await pagesService.create({
            slug: 'home',
            title: 'Welcome to 3DBharat Clone',
            htmlContent: `<h1>3DBharat Clone</h1><p>This is placeholder content. Replace with real scraped HTML.</p>`,
        });
        console.log('✅ Seeded home page');
    }
    else {
        console.log('⚡ Home page already exists');
    }
    await app.close();
}
bootstrap();
//# sourceMappingURL=seed.js.map