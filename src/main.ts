import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = app.get(ConfigService);

  const port = config.get('port') ?? 3000;

  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();
  await app.listen(port, () => {
    console.log(`Delivery Service App running on port: ${port}`);
  });
}
bootstrap();
