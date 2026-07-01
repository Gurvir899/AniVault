import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import Post from './post.entity';
import { JwtGuard } from '../auth/jwt.guard';

@Module({
    imports: [
        TypeOrmModule.forFeature([Post]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '7d' },
        }),
    ],
    providers: [PostsService, JwtGuard],
    controllers: [PostsController],
})
export class PostsModule {}
