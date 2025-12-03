import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { USER_REPOSITORY } from './application/ports/user.repository.port';
import { InMemoryUserRepository } from './infrastructure/adapaters/in-memory-user.repository';
import { UserController } from './presentation/user.controller';
import { GetUserUseCase } from './application/use-cases/get-user.use-case';
import { ListUsersUseCase } from './application/use-cases/list-users.use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: `'USER_SERVICE'`,
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: parseInt(process.env.user_port || '3006'),
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    GetUserUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
    ListUsersUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: InMemoryUserRepository,
    },
  ],
})
export class UserModule {}
