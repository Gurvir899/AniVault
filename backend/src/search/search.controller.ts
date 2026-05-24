import { Controller, Get, Query } from "@nestjs/common";
import { SearchService } from "./search.service";

@Controller()
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Get('search')
    searchAnime(@Query('q') searchTerm: string) {
        return this.searchService.searchAnime(searchTerm);
    }
}