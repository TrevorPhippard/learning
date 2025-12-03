import { NestFactory } from '@nestjs/core';
import { CommentsModule } from './comments.module';

async function bootstrap() {
  const app = await NestFactory.create(CommentsModule);
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();

