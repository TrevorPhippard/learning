import { Module } from "@nestjs/common";
import { CompanyController } from "./presentation/company.controller";
import { CompanyService } from "./application/services/company.service";
import { DrizzleCompanyRepository } from "./infrastructure/adapters/drizzle-company.repository";
import { COMPANY_REPOSITORY } from "./domain/ports/company-repository.port";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: `"SERVICE_A"`,
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: parseInt("3005"),
        },
      },
    ]),
  ],
  controllers: [CompanyController],
  providers: [
    CompanyService,
    { provide: COMPANY_REPOSITORY, useClass: DrizzleCompanyRepository },
    DrizzleCompanyRepository,
  ],
})
export class CompanyModule {}
