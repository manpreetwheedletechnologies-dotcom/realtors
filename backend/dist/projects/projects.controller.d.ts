import { ProjectsService } from './projects.service';
import { Project } from './project.schema';
export declare class ProjectsController {
    private readonly projects;
    constructor(projects: ProjectsService);
    findPublic(landing?: string, limit?: string): Promise<(import("mongoose").Document<unknown, {}, import("./project.schema").ProjectDocument, {}, {}> & Project & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findAllAdmin(): Promise<(import("mongoose").Document<unknown, {}, import("./project.schema").ProjectDocument, {}, {}> & Project & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOne(idOrSlug: string): Promise<import("mongoose").Document<unknown, {}, import("./project.schema").ProjectDocument, {}, {}> & Project & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    create(dto: Partial<Project>): Promise<import("mongoose").Document<unknown, {}, import("./project.schema").ProjectDocument, {}, {}> & Project & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: Partial<Project>): Promise<import("mongoose").Document<unknown, {}, import("./project.schema").ProjectDocument, {}, {}> & Project & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
