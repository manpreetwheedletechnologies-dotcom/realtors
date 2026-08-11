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
exports.LandsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const land_schema_1 = require("./land.schema");
let LandsService = class LandsService {
    constructor(landModel) {
        this.landModel = landModel;
    }
    async findAll() {
        return this.landModel.find().sort({ createdAt: -1 }).exec();
    }
    async findOne(id) {
        const land = await this.landModel.findById(id).exec();
        if (!land) {
            throw new common_1.NotFoundException(`Land plot with ID "${id}" not found`);
        }
        return land;
    }
    async create(dto) {
        const created = new this.landModel(dto);
        return created.save();
    }
    async update(id, dto) {
        const updated = await this.landModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
        if (!updated) {
            throw new common_1.NotFoundException(`Land plot with ID "${id}" not found`);
        }
        return updated;
    }
    async remove(id) {
        const result = await this.landModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Land plot with ID "${id}" not found`);
        }
    }
};
exports.LandsService = LandsService;
exports.LandsService = LandsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(land_schema_1.Land.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LandsService);
//# sourceMappingURL=lands.service.js.map