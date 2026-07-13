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
exports.PagesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const page_schema_1 = require("./page.schema");
let PagesService = class PagesService {
    constructor(pageModel) {
        this.pageModel = pageModel;
    }
    async findAll() {
        return this.pageModel.find().sort({ createdAt: -1 }).exec();
    }
    async findBySlug(slug) {
        const page = await this.pageModel.findOne({ slug }).exec();
        if (!page) {
            throw new common_1.NotFoundException(`Page with slug "${slug}" not found`);
        }
        return page;
    }
    async create(dto) {
        const created = new this.pageModel(dto);
        return created.save();
    }
};
exports.PagesService = PagesService;
exports.PagesService = PagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(page_schema_1.Page.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PagesService);
//# sourceMappingURL=pages.service.js.map