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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const project_schema_1 = require("./project.schema");
const slugify = (s) => s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'project';
let ProjectsService = class ProjectsService {
    constructor(model) {
        this.model = model;
    }
    async uniqueSlug(title, excludeId) {
        const base = slugify(title);
        let slug = base;
        let n = 1;
        while (true) {
            const clash = await this.model.findOne({ slug }).select('_id').lean();
            if (!clash || String(clash._id) === excludeId)
                return slug;
            slug = `${base}-${++n}`;
        }
    }
    async findPublic(opts = {}) {
        const filter = { isPublished: true };
        if (opts.landing)
            filter.showOnLanding = true;
        let q = this.model.find(filter).sort({ order: 1, createdAt: -1 });
        if (opts.limit)
            q = q.limit(opts.limit);
        return q.exec();
    }
    async findAll() {
        return this.model.find().sort({ order: 1, createdAt: -1 }).exec();
    }
    async findOne(idOrSlug, includeDrafts = false) {
        const filter = (0, mongoose_2.isValidObjectId)(idOrSlug) ? { _id: idOrSlug } : { slug: idOrSlug };
        if (!includeDrafts)
            filter.isPublished = true;
        const doc = await this.model.findOne(filter).exec();
        if (!doc)
            throw new common_1.NotFoundException(`Project "${idOrSlug}" not found`);
        return doc;
    }
    async create(dto) {
        dto.slug = await this.uniqueSlug(dto.title || 'project');
        return new this.model(dto).save();
    }
    async update(id, dto) {
        if (dto.title)
            dto.slug = await this.uniqueSlug(dto.title, id);
        const updated = await this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
        if (!updated)
            throw new common_1.NotFoundException(`Project "${id}" not found`);
        return updated;
    }
    async remove(id) {
        const res = await this.model.findByIdAndDelete(id).exec();
        if (!res)
            throw new common_1.NotFoundException(`Project "${id}" not found`);
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(project_schema_1.Project.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map