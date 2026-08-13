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
exports.LeadsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const lead_schema_1 = require("./lead.schema");
let LeadsService = class LeadsService {
    constructor(leadModel) {
        this.leadModel = leadModel;
    }
    async create(data) {
        const lead = new this.leadModel(data);
        return lead.save();
    }
    async findAll() {
        return this.leadModel.find().sort({ createdAt: -1 }).exec();
    }
    async updateStatus(id, status) {
        const lead = await this.leadModel.findByIdAndUpdate(id, { status }, { new: true }).exec();
        if (!lead)
            throw new common_1.NotFoundException('Lead not found');
        return lead;
    }
    async remove(id) {
        const lead = await this.leadModel.findByIdAndDelete(id).exec();
        if (!lead)
            throw new common_1.NotFoundException('Lead not found');
        return { deleted: true };
    }
};
exports.LeadsService = LeadsService;
exports.LeadsService = LeadsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(lead_schema_1.Lead.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LeadsService);
//# sourceMappingURL=Leads.service.js.map