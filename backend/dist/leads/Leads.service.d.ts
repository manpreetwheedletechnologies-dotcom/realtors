import { Model } from 'mongoose';
import { Lead, LeadDocument } from './lead.schema';
export declare class LeadsService {
    private readonly leadModel;
    constructor(leadModel: Model<LeadDocument>);
    create(data: Partial<Lead>): Promise<import("mongoose").Document<unknown, {}, LeadDocument, {}, {}> & Lead & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, LeadDocument, {}, {}> & Lead & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    updateStatus(id: string, status: string): Promise<import("mongoose").Document<unknown, {}, LeadDocument, {}, {}> & Lead & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
