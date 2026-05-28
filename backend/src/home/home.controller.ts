import { Controller, Get, Query } from "@nestjs/common";
import { HomeService } from "./home.service";
import redis from "src/redis/redis";

@Controller()
export class HomeController {
    constructor(private readonly homeService: HomeService) {}

    @Get('home')
    async getHome(@Query('q') filter: string) {
        const cached = await redis.get(`home:${filter}`);
        if (cached != null) {
            return JSON.parse(cached);
        }
        const response = await this.homeService.getHome(filter)
        await redis.set(`home:${filter}`, JSON.stringify(response), {
            EX: 3600
        });
        return response;
    }
}