import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
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
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
