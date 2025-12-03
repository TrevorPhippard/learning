import { NestFactory } from '@nestjs/core';
import { JobsModule } from './jobs.module';

async function bootstrap() {
  const app = await NestFactory.create(JobsModule);
  await app.listen(process.env.PORT ?? 3004);
}
bootstrap();

