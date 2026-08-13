import { Document } from 'mongoose';
export type LeadDocument = Lead & Document;
export declare class Lead {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    queryType: string;
    message: string;
    status: string;
}
export declare const LeadSchema: import("mongoose").Schema<Lead, import("mongoose").Model<Lead, any, any, any, Document<unknown, any, Lead, any, {}> & Lead & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Lead, Document<unknown, {}, import("mongoose").FlatRecord<Lead>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Lead> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
