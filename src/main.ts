import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Request, Response } from 'express';

let cachedHandler: any;

async function bootstrapServer() {
  if (!cachedHandler) {
    const expressApp = express();

    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

    app.enableCors({
      origin: process.env.CORS_ORIGIN ?? 'https://frontend-angular-liard.vercel.app/',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type, Authorization',
    });

    await app.init();

    cachedHandler = expressApp;
  }
  return cachedHandler;
}

export default async function handler(req: Request, res: Response) {
  const server = await bootstrapServer();
  server(req, res);
}



