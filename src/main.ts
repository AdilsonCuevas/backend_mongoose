import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import * as express from 'express';

let cachedHandler: any;

async function bootstrapServer() {
  if (!cachedHandler) {
    const expressApp = express();

    expressApp.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', 'https://frontend-angular-liard.vercel.app');
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      // si no usas cookies, no pongas Access-Control-Allow-Credentials
      if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
      }
      next();
    });

    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    await app.init();

    cachedHandler = expressApp;
  }
  return cachedHandler;
}

export default async function handler(req: Request, res: Response) {
  const server = await bootstrapServer();
  server(req, res);
}
