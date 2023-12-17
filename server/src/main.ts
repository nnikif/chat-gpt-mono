import * as dotenv from 'dotenv';
dotenv.config();
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
      AppModule,
      new ExpressAdapter(),
  );

  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', 'client/dist/client'));


  app.enableCors({
    origin: ['http://localhost:4200','https://gpt-frontend-76a470c6a0ff.herokuapp.com'], // Your frontend's address
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept',
  });
  await app.listen(process.env.PORT || 3000);
  const server = app.getHttpAdapter().getInstance();
  server.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../client/dist/client/index.html'));
  });
}
bootstrap();
