import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
  origin: 'http://localhost:3000',
  });

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
);

const config = new DocumentBuilder()
  .setTitle('Personal Knowledge Hub API')
  .setDescription('API documentation for the Personal Knowledge Hub application')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, config);

SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT') ?? 3001;

  await app.listen(port);

  console.log(`🚀 Backend running at http://localhost:${port}`);
}

bootstrap();