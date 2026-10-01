import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Project, ProjectDocument } from './project.schema';

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'project';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project.name) private model: Model<ProjectDocument>) {}

  private async uniqueSlug(title: string, excludeId?: string): Promise<string> {
    const base = slugify(title);
    let slug = base;
    let n = 1;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const clash = await this.model.findOne({ slug }).select('_id').lean();
      if (!clash || String(clash._id) === excludeId) return slug;
      slug = `${base}-${++n}`;
    }
  }

  /** Public: only published projects. */
  async findPublic(opts: { landing?: boolean; limit?: number } = {}) {
    const filter: any = { isPublished: true };
    if (opts.landing) filter.showOnLanding = true;
    let q = this.model.find(filter).sort({ order: 1, createdAt: -1 });
    if (opts.limit) q = q.limit(opts.limit);
    return q.exec();
  }

  /** Admin: everything incl. drafts. */
  async findAll() {
    return this.model.find().sort({ order: 1, createdAt: -1 }).exec();
  }

  /** Accepts Mongo id or slug. Drafts are hidden unless includeDrafts. */
  async findOne(idOrSlug: string, includeDrafts = false) {
    const filter: any = isValidObjectId(idOrSlug) ? { _id: idOrSlug } : { slug: idOrSlug };
    if (!includeDrafts) filter.isPublished = true;
    const doc = await this.model.findOne(filter).exec();
    if (!doc) throw new NotFoundException(`Project "${idOrSlug}" not found`);
    return doc;
  }

  async create(dto: Partial<Project>) {
    dto.slug = await this.uniqueSlug(dto.title || 'project');
    return new this.model(dto).save();
  }

  async update(id: string, dto: Partial<Project>) {
    if (dto.title) dto.slug = await this.uniqueSlug(dto.title, id);
    const updated = await this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updated) throw new NotFoundException(`Project "${id}" not found`);
    return updated;
  }

  async remove(id: string) {
    const res = await this.model.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException(`Project "${id}" not found`);
  }
}
