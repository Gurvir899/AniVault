import { Controller, Get, Param } from "@nestjs/common";
import { DetailsService } from "./details.service"

@Controller()
export class DetailsController {
    constructor(private readonly detailsService: DetailsService) {}

    @Get('anime/:id')
    getAnimeById(@Param('id') id: string) {
        return this.detailsService.getAnimeById(Number(id));
    }
}