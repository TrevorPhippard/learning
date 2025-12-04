import { NestFactory } from "@nestjs/core";
import { FeedModule } from "./feed.module";

async function bootstrap() {
  const app = await NestFactory.create(FeedModule);
  await app.listen(3003);
}
bootstrap();
