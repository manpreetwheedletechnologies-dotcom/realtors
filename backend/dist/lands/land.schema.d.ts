import { Document } from 'mongoose';
export type LandDocument = Land & Document;
export declare class Land {
    title: string;
    location: string;
    price: string;
    size: string;
    type: string;
    dimensions: string;
    facing: string;
    owner: string;
    images: string[];
    rating: number;
    amenities: string[];
    verification: string;
    measurement: string;
}
export declare const LandSchema: import("mongoose").Schema<Land, import("mongoose").Model<Land, any, any, any, Document<unknown, any, Land, any, {}> & Land & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Land, Document<unknown, {}, import("mongoose").FlatRecord<Land>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Land> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
