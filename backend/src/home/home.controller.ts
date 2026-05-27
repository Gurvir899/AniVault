import { Controller, Get, Query } from "@nestjs/common";
import { HomeService } from "./home.service";

@Controller()
export class HomeController {
    constructor(private readonly homeService: HomeService) {}

    @Get('home')
    getHome(@Query('q') filter: string) {
        return this.homeService.getHome(filter);
    }
}