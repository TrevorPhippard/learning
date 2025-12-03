import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepositoryPort,
} from '../ports/user.repository.port';
import { map } from 'rxjs';

@Injectable()
export class GetUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);
    const startTs = Date.now();
    const pattern = { cmd: 'ping' };
    const payload = {};

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return this.userRepository
      .send(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs })),
      );
  }
}
