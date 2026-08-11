import { Model } from 'mongoose';
import { Land, LandDocument } from './land.schema';
export declare class LandsService {
    private landModel;
    constructor(landModel: Model<LandDocument>);
    findAll(): Promise<Land[]>;
    findOne(id: string): Promise<Land>;
    create(dto: Partial<Land>): Promise<Land>;
    update(id: string, dto: Partial<Land>): Promise<Land>;
    remove(id: string): Promise<void>;
}
