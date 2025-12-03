import { Controller, Post as HttpPost, Body, Get, Param, Patch } from '@nestjs/common';
import { CommentService } from '../application/services/comment.service';
import { CreateCommentDto } from '../application/dtos/create-comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly svc: CommentService) {}

  @HttpPost()
  async create(@Body() dto: CreateCommentDto) {
    return this.svc.create(dto);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.svc.getById(id);
  }

  @Get('post/:postId')
  async findByPost(@Param('postId') postId: string) {
    return this.svc.findByPost(postId);
  }

  @Patch(':id')
  async updateContent(@Param('id') id: string, @Body('content') content: string) {
    return this.svc.updateContent(id, content);
  }
}
