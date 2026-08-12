import { Document } from 'mongoose';
export type HeroSettingsDocument = HeroSettings & Document;
export declare class HeroSettings {
    images: string[];
}
export declare const HeroSettingsSchema: import("mongoose").Schema<HeroSettings, import("mongoose").Model<HeroSettings, any, any, any, Document<unknown, any, HeroSettings, any, {}> & HeroSettings & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, HeroSettings, Document<unknown, {}, import("mongoose").FlatRecord<HeroSettings>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<HeroSettings> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
