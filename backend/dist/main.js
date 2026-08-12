"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const express = require("express");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    const uploadsPath = (0, path_1.join)(process.cwd(), 'uploads');
    console.log('UPLOADS PATH:', uploadsPath);
    app.use('/uploads', express.static(uploadsPath));
    app.enableCors({
        origin: [
            'http://localhost:3001',
            'https://www.pgirealtors.com',
        ],
        credentials: true,
    });
    const port = process.env.NEST_PORT || 4000;
    await app.listen(port);
    console.log(`🚀 Backend listening on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map