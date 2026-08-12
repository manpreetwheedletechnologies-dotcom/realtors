import { HeroService } from './hero.service';
export declare class HeroController {
    private readonly heroService;
    constructor(heroService: HeroService);
    getImages(): Promise<{
        images: string[];
    }>;
    setImages(images: string[]): Promise<{
        images: string[];
    }>;
}
