import { VideosService } from './videos.service';
import { Video } from './video.schema';
export declare class VideosController {
    private readonly videosService;
    constructor(videosService: VideosService);
    findAll(): Promise<Video[]>;
    findOne(id: string): Promise<Video>;
    create(dto: Partial<Video>): Promise<Video>;
    update(id: string, dto: Partial<Video>): Promise<Video>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
