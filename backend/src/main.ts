import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectRedis } from './redis/redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000'
  });

  await connectRedis();
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
