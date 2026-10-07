import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
      trustProxy: true,
    }),
    { bodyParser: false }
  );

  app.setGlobalPrefix('api');
  app.enableCors();

  await app.listen(3000, '0.0.0.0');
}

bootstrap().catch((err) => {
  console.error('Fallo al arrancar la aplicación:', err);
  process.exit(1);
});
