import { LeadsService } from './leads.service';
declare class CreateLeadDto {
    firstName: string;
    lastName?: string;
    email: string;
    phone: string;
    queryType?: string;
    message: string;
}
declare class UpdateStatusDto {
    status: string;
}
export declare class LeadsController {
    private readonly leadsService;
    constructor(leadsService: LeadsService);
    create(dto: CreateLeadDto): Promise<import("mongoose").Document<unknown, {}, import("./Lead.schema").LeadDocument, {}, {}> & import("./Lead.schema").Lead & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./Lead.schema").LeadDocument, {}, {}> & import("./Lead.schema").Lead & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    updateStatus(id: string, dto: UpdateStatusDto): Promise<import("mongoose").Document<unknown, {}, import("./Lead.schema").LeadDocument, {}, {}> & import("./Lead.schema").Lead & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
export {};
