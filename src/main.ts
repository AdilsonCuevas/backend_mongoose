import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware global CORS
  app.use((req, res, next) => {
    res.setHeader(
      'Access-Control-Allow-Origin',
      'https://frontend-angular-liard.vercel.app'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    );

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    next();
  });

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
