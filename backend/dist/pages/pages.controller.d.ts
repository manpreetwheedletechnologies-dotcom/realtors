import { PagesService } from './pages.service';
export declare class PagesController {
    private readonly pagesService;
    constructor(pagesService: PagesService);
    getPage(slug: string): Promise<{
        title: string;
        html: string;
    }>;
    list(limit?: number): Promise<import("./page.schema").Page[]>;
}
