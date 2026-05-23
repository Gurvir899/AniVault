import { Controller, Get, Query } from "@nestjs/common";
import { SearchService } from "./search.service";
import type { Anime } from "../anime/anime.interface"

@Controller()
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Get('search')
    searchAnime(@Query('q') searchTerm: string): Anime[] {
        return this.searchService.searchAnime(searchTerm);
    }
}