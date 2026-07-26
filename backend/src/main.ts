import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);

  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT') ?? 3001;

  await app.listen(port);

  console.log(`🚀 Backend running at http://localhost:${port}`);
}

bootstrap();