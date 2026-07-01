import { Controller, Get, Post as HttpPost, Body, Query, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtGuard } from 'src/auth/jwt.guard';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @HttpPost()
    @UseGuards(JwtGuard)
    async create(
        @Request() req: any,
        @Body() body: { title: string; body: string; animeId: number; animeTitle: string; animeCoverUrl?: string },
    ) {
        return this.postsService.create(req.user.sub, body);
    }

    @Get()
    async find(@Query('animeId') animeId?: string, @Query('userId') userId?: string) {
        if (animeId) {
            return this.postsService.findByAnime(Number(animeId));
        }
        if (userId) {
            return this.postsService.findByUser(Number(userId));
        }
        throw new BadRequestException('animeId or userId query param is required');
    }
}
