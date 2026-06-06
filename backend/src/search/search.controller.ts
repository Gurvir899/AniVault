import { Controller, Get, Query } from "@nestjs/common";
import { SearchService } from "./search.service";
import redis from "src/redis/redis";

@Controller()
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Get('search')
    async searchAnime(@Query('q') searchTerm: string) {
        const normalized = searchTerm.trim().toLowerCase();

        const cached = await redis.get(`search:${normalized}`);

        if (cached != null) {
            return JSON.parse(cached);
        }

        const response = await this.searchService.searchAnime(normalized);

        await redis.set(
            `search:${normalized}`,
            JSON.stringify(response),
            {
                EX: 300
            }
        );

        return response;
    }
}