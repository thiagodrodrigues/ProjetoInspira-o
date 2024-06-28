import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { config } from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Swagger } from './shared/swagger/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders:
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, Access-Control-Allow-Methods, Access-Control-Allow-Headers, Access-Control-Allow-Origin',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 84600,
  };

  const config = new Swagger();
  config.configSwagger('Inspiracao-Fisioterapia', 'Endpoints-inspiracao', '1.0', 'Inspiracao-Fisioterapia', app);

  app.enableCors(corsOptions);
  await app.listen(process.env.PORT);
}
bootstrap();
