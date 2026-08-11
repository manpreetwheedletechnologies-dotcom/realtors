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
exports.VideosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const video_schema_1 = require("./video.schema");
let VideosService = class VideosService {
    constructor(videoModel) {
        this.videoModel = videoModel;
    }
    async findAll() {
        return this.videoModel.find().exec();
    }
    async findOne(id) {
        const video = await this.videoModel.findById(id).exec();
        if (!video) {
            throw new common_1.NotFoundException(`Video with ID "${id}" not found`);
        }
        return video;
    }
    async create(dto) {
        const created = new this.videoModel(dto);
        return created.save();
    }
    async update(id, dto) {
        const updated = await this.videoModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
        if (!updated) {
            throw new common_1.NotFoundException(`Video with ID "${id}" not found`);
        }
        return updated;
    }
    async remove(id) {
        const result = await this.videoModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Video with ID "${id}" not found`);
        }
    }
};
exports.VideosService = VideosService;
exports.VideosService = VideosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(video_schema_1.Video.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], VideosService);
//# sourceMappingURL=videos.service.js.map