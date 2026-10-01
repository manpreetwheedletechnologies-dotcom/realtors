import { Model } from 'mongoose';
import { Project, ProjectDocument } from './project.schema';
export declare class ProjectsService {
    private model;
    constructor(model: Model<ProjectDocument>);
    private uniqueSlug;
    findPublic(opts?: {
        landing?: boolean;
        limit?: number;
    }): Promise<(import("mongoose").Document<unknown, {}, ProjectDocument, {}, {}> & Project & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, ProjectDocument, {}, {}> & Project & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOne(idOrSlug: string, includeDrafts?: boolean): Promise<import("mongoose").Document<unknown, {}, ProjectDocument, {}, {}> & Project & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    create(dto: Partial<Project>): Promise<import("mongoose").Document<unknown, {}, ProjectDocument, {}, {}> & Project & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: Partial<Project>): Promise<import("mongoose").Document<unknown, {}, ProjectDocument, {}, {}> & Project & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<void>;
}
