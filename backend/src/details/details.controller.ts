import { Controller, Get, Param } from "@nestjs/common";
import { DetailsService } from "./details.service";
import redis from "src/redis/redis";

@Controller()
export class DetailsController {
    constructor(private readonly detailsService: DetailsService) {}

    @Get('anime/:id')
    async getAnimeById(@Param('id') id: string) {
        const cached = await redis.get(`anime:${id}`);
        if (cached != null) {
            return JSON.parse(cached);
        }
        const response = await this.detailsService.getAnimeById(Number(id));
        await redis.set(`anime:${id}`, JSON.stringify(response), {
            EX: 43200
        });
        return response;
    }
}