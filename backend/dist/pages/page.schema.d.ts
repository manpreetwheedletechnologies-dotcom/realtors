import { Document } from 'mongoose';
export type PageDocument = Page & Document;
export declare class Page {
    slug: string;
    title: string;
    htmlContent: string;
}
export declare const PageSchema: import("mongoose").Schema<Page, import("mongoose").Model<Page, any, any, any, Document<unknown, any, Page, any, {}> & Page & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Page, Document<unknown, {}, import("mongoose").FlatRecord<Page>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Page> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
