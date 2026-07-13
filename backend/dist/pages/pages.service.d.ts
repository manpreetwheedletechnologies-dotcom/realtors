import { Model } from 'mongoose';
import { Page, PageDocument } from './page.schema';
export declare class PagesService {
    private pageModel;
    constructor(pageModel: Model<PageDocument>);
    findAll(): Promise<Page[]>;
    findBySlug(slug: string): Promise<Page>;
    create(dto: Partial<Page>): Promise<Page>;
}
