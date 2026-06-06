import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';
import { DetailsModule } from './details/details.module';
import { HomeModule } from './home/home.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ThrottlerModule.forRoot([{ttl: 60000, limit: 30}]), SearchModule, DetailsModule, HomeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
