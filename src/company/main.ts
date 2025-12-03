import { NestFactory } from '@nestjs/core';
import { CompanyModule } from './company.module';

async function bootstrap() {
  const app = await NestFactory.create(CompanyModule);
  await app.listen(process.env.PORT ?? 3005);
}
bootstrap();

