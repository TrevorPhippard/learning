import { ClientsProviderAsyncOptions, Transport } from '@nestjs/microservices';
import type { TcpOptions } from '@nestjs/microservices/interfaces/microservice-configuration.interface';

const DEFAULT_HOST = 'users';
const DEFAULT_PORT = 3006;

export const usersClientFactory: ClientsProviderAsyncOptions = {
  name: 'USERS_SERVICE',
  useFactory: () => ({
    transport: Transport.TCP,
    options: {
      host: process.env.USERS_SERVICE_HOST ?? DEFAULT_HOST,
      port: Number(process.env.USERS_SERVICE_PORT ?? DEFAULT_PORT),
    },
  }),
};