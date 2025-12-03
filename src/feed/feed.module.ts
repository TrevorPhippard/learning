import { Module } from "@nestjs/common";
import { FeedController } from "./presentation/feed.controller";
import { FeedService } from "./application/services/feed.service";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: `"SERVICE_A"`,
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: parseInt("3006"),
        },
      },
    ]),
  ],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
