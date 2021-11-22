import {
  BadRequestException,
  Logger,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        if (validationErrors[0].children.length)
          return new BadRequestException(
            Object.values(validationErrors[0].children[0].constraints)[0],
          );
        else
          return new BadRequestException(
            Object.values(validationErrors[0].constraints)[0],
          );
      },
    }),
  );
  const port = configuration.call(this).port || 3002;
  app.setGlobalPrefix('/api/v1');
  await app.listen(port);
  Logger.log('App is running on port ' + port, "Create Rest API");
}
bootstrap();
