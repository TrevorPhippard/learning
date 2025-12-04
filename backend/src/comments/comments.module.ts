import { Module } from "@nestjs/common";
import { CommentController } from "./presentation/comment.controller";
import { CommentService } from "./application/services/comment.service";
import { DrizzleCommentRepository } from "./infrastructure/adapters/drizzle-comment.repository";
import { COMMENT_REPOSITORY } from "./domain/ports/comment-repository.port";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: `"SERVICE_A"`,
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: parseInt("3001"),
        },
      },
    ]),
  ],
  controllers: [CommentController],
  providers: [
    CommentService,
    { provide: COMMENT_REPOSITORY, useClass: DrizzleCommentRepository },
    DrizzleCommentRepository,
  ],
})
export class CommentsModule {}
