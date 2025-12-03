import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Request,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePostDto } from './rest/dto/create-post.dto';
import { UpdateProfileDto } from './rest/dto/update-profile.dto';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}
  @Get('/')
  health() {
    return { status: 'API Gateway running' };
  }

  // --- REST: Fetch profile ---
  @Get('profile/:id')
  getProfile(@Param('id') id: string) {
    return this.service.getUserProfile(id);
  }

  // --- REST: Update profile + emit events ---
  @Put('profile')
  async updateProfile(@Request() req, @Body() dto: UpdateProfileDto) {
    const updated = await this.service
      .updateUserProfile(req.user.id, dto)
      .toPromise();

    // async events
    this.service.emitProfileUpdatedEvent(req.user.id, dto);

    return updated;
  }

  // --- REST: Create post + async events ---
  @Post('posts')
  async createPost(@Request() req, @Body() dto: CreatePostDto) {
    const post = await this.service
      .createPost(req.user.id, dto)
      .toPromise();

    // async events (feed, search, notifications)
    this.service.emitPostCreatedEvent(post);

    return post;
  }

  // --- REST: Home feed ---
  @Get('feed')
  getFeed(@Request() req) {
    return this.service.getHomeFeed(req.user.id);
  }
}
