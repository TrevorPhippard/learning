import { ClientsProviderAsyncOptions, Transport } from "@nestjs/microservices";
import type { TcpClientOptions } from "@nestjs/microservices/interfaces/client-metadata.interface";

const DEFAULT_HOST = "messaging";
const DEFAULT_PORT = 3008;

export const messagingClientFactory: ClientsProviderAsyncOptions = {
  name: "MESSAGING_SERVICE",
  useFactory: (): TcpClientOptions => ({
    transport: Transport.TCP,
    options: {
      host: process.env.MESSAGING_SERVICE_HOST ?? DEFAULT_HOST,
      port: Number(process.env.MESSAGING_SERVICE_PORT ?? DEFAULT_PORT),
    },
  }),
};
