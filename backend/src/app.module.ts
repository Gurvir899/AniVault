import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';
import { DetailsModule } from './details/details.module';

@Module({
  imports: [SearchModule, DetailsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
