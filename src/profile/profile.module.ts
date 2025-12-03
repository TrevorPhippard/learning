import { Module } from '@nestjs/common';
import { ProfileController } from './presentation/profile.controller';
import { ProfileService } from './application/services/profile.service';
import { DrizzleProfileRepository } from './infrastructure/adapaters/drizzle-profile.repository';
import { PROFILE_REPOSITORY } from './domain/ports/profile.repository.port';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: `'SERVICE_A'`,
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: parseInt(process.env.profile_port || '3003'),
        },
      },
    ]),
  ],
  controllers: [ProfileController],
  providers: [
    ProfileService,
    { provide: PROFILE_REPOSITORY, useClass: DrizzleProfileRepository },
    DrizzleProfileRepository,
  ],
})
export class ProfileModule {}
