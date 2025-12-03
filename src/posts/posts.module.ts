import { Module } from '@nestjs/common';
import { PostController } from './presentation/post.controller';
import { PostService } from './application/services/post.service';
import { DrizzlePostRepository } from './infrastructure/adapters/drizzle-post.repository';
import { POST_REPOSITORY } from './domain/ports/post-repository.port';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: `'SERVICE_A'`,
        transport: Transport.TCP,
        options: {
          host: '127.0.0.1',
          port: parseInt(process.env.posts_port || '3002'),
        },
      },
    ]),
  ],
  controllers: [PostController],
  providers: [
    PostService,
    { provide: POST_REPOSITORY, useClass: DrizzlePostRepository },
    DrizzlePostRepository,
  ],
})
export class PostsModule {}
