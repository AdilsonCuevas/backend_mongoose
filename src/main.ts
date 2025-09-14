import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'https://frontend-angular-liard.vercel.app',
      process.env.CORS_ORIGIN,
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Middleware manual para asegurar preflight en Render
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Origin',
      'https://frontend-angular-liard.vercel.app',
    );
    res.header(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization',
    );

    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
