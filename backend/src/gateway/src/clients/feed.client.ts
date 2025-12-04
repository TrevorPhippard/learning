import { ClientsProviderAsyncOptions, Transport } from "@nestjs/microservices";
import type { TcpOptions } from "@nestjs/microservices/interfaces/microservice-configuration.interface";

const DEFAULT_HOST = "feed";
const DEFAULT_PORT = 3003;

export const feedClientFactory: ClientsProviderAsyncOptions = {
  name: "FEED_SERVICE",
  useFactory: () => ({
    transport: Transport.TCP,
    options: {
      host: process.env.FEED_SERVICE_HOST ?? DEFAULT_HOST,
      port: Number(process.env.FEED_SERVICE_PORT ?? DEFAULT_PORT),
    },
  }),
};
