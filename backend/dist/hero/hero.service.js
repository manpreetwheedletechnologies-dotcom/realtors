"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const hero_schema_1 = require("./hero.schema");
const DEFAULT_HERO_IMAGES = [
    '/hero3.jpg',
    '/hero5.png',
    '/hero_8.jpeg',
    '/hero_9.jpeg',
    '/hero_10.jpeg',
];
let HeroService = class HeroService {
    constructor(heroModel) {
        this.heroModel = heroModel;
    }
    async getOrCreate() {
        let doc = await this.heroModel.findOne().exec();
        if (!doc) {
            doc = await this.heroModel.create({ images: DEFAULT_HERO_IMAGES });
        }
        return doc;
    }
    async getImages() {
        const doc = await this.getOrCreate();
        return doc.images;
    }
    async setImages(images) {
        const doc = await this.getOrCreate();
        doc.images = images;
        await doc.save();
        return doc.images;
    }
};
exports.HeroService = HeroService;
exports.HeroService = HeroService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(hero_schema_1.HeroSettings.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], HeroService);
//# sourceMappingURL=hero.service.js.map