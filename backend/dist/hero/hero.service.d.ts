import { Model } from 'mongoose';
import { HeroSettingsDocument } from './hero.schema';
export declare class HeroService {
    private readonly heroModel;
    constructor(heroModel: Model<HeroSettingsDocument>);
    private getOrCreate;
    getImages(): Promise<string[]>;
    setImages(images: string[]): Promise<string[]>;
}
