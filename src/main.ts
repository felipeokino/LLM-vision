import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const uploadDir = join(process.cwd(), 'uploads');
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir);
  }
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));
  await app.listen(3000);
}
bootstrap();
