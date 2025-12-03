import { Controller, Get, Param } from '@nestjs/common';
import { FeedService } from '../application/services/feed.service';
import { MessagePattern } from '@nestjs/microservices';
import { of, delay } from 'rxjs';

@Controller('feed')
export class FeedController {
  constructor(private readonly svc: FeedService) {}
  @MessagePattern({ cmd: 'ping' })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ping(_: any) {
    return of('pong').pipe(delay(1000));
  }

  @Get(':userId')
  async getFeed(@Param('userId') userId: string) {
    return this.svc.getFeed(userId);
  }
}
