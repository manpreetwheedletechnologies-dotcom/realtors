import { LandsService } from './lands.service';
import { Land } from './land.schema';
export declare class LandsController {
    private readonly landsService;
    constructor(landsService: LandsService);
    findAll(): Promise<Land[]>;
    findOne(id: string): Promise<Land>;
    create(dto: Partial<Land>): Promise<Land>;
    update(id: string, dto: Partial<Land>): Promise<Land>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
