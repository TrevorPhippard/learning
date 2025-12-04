import { ClientsProviderAsyncOptions, Transport } from "@nestjs/microservices";
import type { TcpOptions } from "@nestjs/microservices/interfaces/microservice-configuration.interface";

const DEFAULT_HOST = "posts";
const DEFAULT_PORT = 3001;

export const postsClientFactory: ClientsProviderAsyncOptions = {
  name: "POSTS_SERVICE",
  useFactory: () => ({
    transport: Transport.TCP,
    options: {
      host: process.env.POSTS_SERVICE_HOST ?? DEFAULT_HOST,
      port: Number(process.env.POSTS_SERVICE_PORT ?? DEFAULT_PORT),
    },
  }),
};
