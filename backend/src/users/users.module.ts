import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PublicProfileController } from './public-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from 'src/auth/jwt.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    })
  ],
  providers: [UsersService, JwtGuard],
  controllers: [UsersController, PublicProfileController],
  exports: [UsersService, JwtGuard]
})
export class UsersModule {}
