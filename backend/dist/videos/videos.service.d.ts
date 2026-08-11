import { Model } from 'mongoose';
import { Video, VideoDocument } from './video.schema';
export declare class VideosService {
    private videoModel;
    constructor(videoModel: Model<VideoDocument>);
    findAll(): Promise<Video[]>;
    findOne(id: string): Promise<Video>;
    create(dto: Partial<Video>): Promise<Video>;
    update(id: string, dto: Partial<Video>): Promise<Video>;
    remove(id: string): Promise<void>;
}
