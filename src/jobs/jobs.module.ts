import { Module } from "@nestjs/common";
import { JobController } from "./presentation/job.controller";
import { JobService } from "./application/services/job.service";
import { DrizzleJobRepository } from "./infrastructure/adapters/drizzle-job.repository";
import { JOB_REPOSITORY } from "./domain/ports/job-repository.port";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: `"SERVICE_A"`,
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: parseInt("3004"),
        },
      },
    ]),
  ],
  controllers: [JobController],
  providers: [
    JobService,
    { provide: JOB_REPOSITORY, useClass: DrizzleJobRepository },
    DrizzleJobRepository,
  ],
})
export class JobsModule {}
