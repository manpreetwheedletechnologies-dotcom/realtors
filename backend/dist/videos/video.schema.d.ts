import { Document } from 'mongoose';
export type VideoDocument = Video & Document;
export declare class Video {
    src: string;
    title: string;
    subtitle: string;
    badge: string;
    size: string;
    tag: string;
}
export declare const VideoSchema: import("mongoose").Schema<Video, import("mongoose").Model<Video, any, any, any, Document<unknown, any, Video, any, {}> & Video & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Video, Document<unknown, {}, import("mongoose").FlatRecord<Video>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Video> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
