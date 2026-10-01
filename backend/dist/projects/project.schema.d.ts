import { Document } from 'mongoose';
export type ProjectDocument = Project & Document;
export declare const PROJECT_STATUSES: string[];
export declare class Project {
    title: string;
    slug: string;
    tagline: string;
    description: string;
    status: string;
    location: string;
    type: string;
    price: string;
    area: string;
    totalUnits: string;
    developer: string;
    reraNumber: string;
    launchDate: string;
    possessionDate: string;
    coverImage: string;
    images: string[];
    videoUrl: string;
    videos: string[];
    brochureUrl: string;
    highlights: string[];
    amenities: string[];
    showOnLanding: boolean;
    isPublished: boolean;
    order: number;
}
export declare const ProjectSchema: import("mongoose").Schema<Project, import("mongoose").Model<Project, any, any, any, Document<unknown, any, Project, any, {}> & Project & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Project, Document<unknown, {}, import("mongoose").FlatRecord<Project>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Project> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
