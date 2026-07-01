import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class PublicProfileController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':id')
    async getPublicProfile(@Param('id') id: string) {
        return this.usersService.findPublicProfile(Number(id));
    }
}
