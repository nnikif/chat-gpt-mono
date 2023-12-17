import * as dotenv from 'dotenv';
dotenv.config();
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
      AppModule
  );

  app.use(cookieParser());
  app.setGlobalPrefix('api');



  app.enableCors({
    origin: ['http://localhost:4200','https://gpt-frontend-76a470c6a0ff.herokuapp.com'], // Your frontend's address
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept',
  });

  // await app.init();

  // app.useStaticAssets(join(__dirname, '..', '..','client/dist/gpt-angular'));

  // console.log(join(__dirname, '..', '..','client/dist/client'))
  // await app.init();


  // console.log(join(__dirname, '../../client/dist/gpt-angular/index.html'));
  const server = app.getHttpAdapter().getInstance();
  app.use(express.static(join(__dirname, '..', '../client/dist/gpt-angular')));
  server.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(join(__dirname, '../../client/dist/gpt-angular/index.html'));
  });
  await app.listen(process.env.PORT || 3000);


}
bootstrap();
