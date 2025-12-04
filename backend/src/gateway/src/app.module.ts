import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { usersClientFactory } from "./clients/users.client";
import { postsClientFactory } from "./clients/posts.client";
import { feedClientFactory } from "./clients/feed.client";
import { messagingClientFactory } from "./clients/messaging.client";

import { usersEventsFactory } from "./events/users.events";
import { postsEventsFactory } from "./events/posts.events";
import { feedEventsFactory } from "./events/feed.events";
import { searchEventsFactory } from "./events/search.events";
import { messagingEventsFactory } from "./events/messaging.events";

@Module({
  imports: [
    ClientsModule.registerAsync([
      usersClientFactory,
      postsClientFactory,
      feedClientFactory,
      messagingClientFactory,

      usersEventsFactory,
      postsEventsFactory,
      feedEventsFactory,
      searchEventsFactory,
      messagingEventsFactory,
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
