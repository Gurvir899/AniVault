import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Post from './post.entity';

function mapPost(post: Post) {
    return {
        id: post.id,
        title: post.title,
        body: post.body,
        animeId: post.animeId,
        animeTitle: post.animeTitle,
        animeCoverUrl: post.animeCoverUrl,
        createdAt: post.createdAt,
        user: { id: post.user.id, username: post.user.username },
    };
}

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>,
    ) {}

    async create(
        userId: number,
        data: { title: string; body: string; animeId: number; animeTitle: string; animeCoverUrl?: string },
    ) {
        if (!data.title || !data.body || !data.animeId || !data.animeTitle) {
            throw new BadRequestException('title, body, animeId and animeTitle are required');
        }
        const post = this.postsRepository.create({
            title: data.title,
            body: data.body,
            animeId: data.animeId,
            animeTitle: data.animeTitle,
            animeCoverUrl: data.animeCoverUrl,
            userId,
        });
        const saved = await this.postsRepository.save(post);
        const withUser = await this.postsRepository.findOne({ where: { id: saved.id }, relations: { user: true } });
        return mapPost(withUser!);
    }

    async findByAnime(animeId: number) {
        const posts = await this.postsRepository.find({
            where: { animeId },
            relations: { user: true },
            order: { createdAt: 'DESC' },
        });
        return posts.map(mapPost);
    }

    async findByUser(userId: number) {
        const posts = await this.postsRepository.find({
            where: { userId },
            relations: { user: true },
            order: { createdAt: 'DESC' },
        });
        return posts.map(mapPost);
    }
}
