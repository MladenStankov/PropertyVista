import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN'),
    credentials: true,
  });
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", 'accounts.google.com'],
          connectSrc: ["'self'", 'https://accounts.google.com'],
          frameSrc: ["'self'", 'https://accounts.google.com'],
        },
      },
    }),
  );
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('PropertyVistaSwagger')
    .setDescription('The documentation of the backend of PropertyVista')
    .setVersion('1.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(configService.get<number>('PORT', 3000));
  console.log(`Server is listening on: ${await app.getUrl()}`);
  console.log(`Swagger API on: ${await app.getUrl()}/api`);
}
bootstrap();
