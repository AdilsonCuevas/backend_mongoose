// api/index.js
const serverless = require('serverless-http');
const express = require('express');
const { NestFactory } = require('@nestjs/core');
const { ExpressAdapter } = require('@nestjs/platform-express');

// IMPORTA TU AppModule desde la carpeta dist generada por `nest build`
const { AppModule } = require('../dist/src/app.module');

const server = express();
let handler; // cache del handler entre invocaciones (reduce cold starts)

module.exports = async (req, res) => {
    if (!handler) {
        const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
        // opcional: prefijo global
        app.setGlobalPrefix('api');
        // inicializa (no escuchar puerto)
        await app.init();
        handler = serverless(server);
    }
    return handler(req, res);
};
