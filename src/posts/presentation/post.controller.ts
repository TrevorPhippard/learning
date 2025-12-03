import {
  Controller,
  Post as HttpPost,
  Body,
  Get,
  Param,
  Patch,
} from "@nestjs/common";
import { PostService } from "../application/services/post.service";
import { CreatePostDto } from "../application/dtos/create-post.dto";

@Controller("posts")
export class PostController {
  constructor(private readonly svc: PostService) {}

  @HttpPost()
  async create(@Body() dto: CreatePostDto) {
    return this.svc.create(dto);
  }

  @Get(":id")
  async get(@Param("id") id: string) {
    return this.svc.getById(id);
  }

  @Patch(":id/reactions")
  async addReaction(
    @Param("id") id: string,
    @Body("userId") userId: string,
    @Body("type") type: string
  ) {
    await this.svc.addReaction(id, userId, type);
    return { ok: true };
  }

  @Patch(":id/comments")
  async addComment(
    @Param("id") id: string,
    @Body("commentId") commentId: string,
    @Body("userId") userId: string,
    @Body("content") content: string
  ) {
    await this.svc.addComment(id, commentId, userId, content);
    return { ok: true };
  }
}
