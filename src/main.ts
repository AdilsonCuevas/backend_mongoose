import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Request, Response } from 'express';

import * as express from 'express';

let cachedHandler: any;

async function bootstrapServer() {
  if (!cachedHandler) {
    const expressApp = express();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));

    // Configuración de CORS
    app.enableCors({
      origin: process.env.CORS_ORIGIN ?? 'http://localhost:4200',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });

    await app.init();
    cachedHandler = expressApp;
  }
  return cachedHandler;
}

// Handler para Vercel
export default async function handler(req: Request, res: Response) {
  const server = await bootstrapServer();
  server(req, res);
}

