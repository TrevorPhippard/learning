import { ClientsProviderAsyncOptions, Transport } from "@nestjs/microservices";
import type { KafkaOptions } from "@nestjs/microservices/interfaces/microservice-configuration.interface";

const kafkaBroker = process.env.KAFKA_BROKER ?? "kafka:9092";

export const searchEventsFactory: ClientsProviderAsyncOptions = {
  name: "SEARCH_EVENTS",
  useFactory: (): KafkaOptions => ({
    transport: Transport.KAFKA,
    options: {
      client: { brokers: [kafkaBroker] },
      consumer: { groupId: "gateway-search" },
    },
  }),
};
