import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';
import { DetailsModule } from './details/details.module';
import { HomeModule } from './home/home.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{ttl: 60000, limit: 30}]), 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USER ?? 'anivault',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME ?? 'anivault',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    SearchModule,
    DetailsModule,
    HomeModule,
    UsersModule],
  controllers: [AppController],
  providers: [AppService, {provide: APP_GUARD, useClass: ThrottlerGuard}],
})
export class AppModule {}
