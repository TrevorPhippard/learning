import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let controller: AppController;

  const mockService = {
    getUserProfile: jest.fn(),
    createPost: jest.fn(),
    emitPostCreatedEvent: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AppService, useValue: mockService }],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should call service.getUserProfile on GET /profile/:id', () => {
    controller.getProfile('123');
    expect(mockService.getUserProfile).toHaveBeenCalledWith('123');
  });

  it('should call createPost + emitPostCreatedEvent', async () => {
    mockService.createPost.mockResolvedValue({ id: 'p1' });

    await controller.createPost({ user: { id: 'u1' } }, { content: 'hello' });

    expect(mockService.createPost).toHaveBeenCalled();
    expect(mockService.emitPostCreatedEvent).toHaveBeenCalledWith({ id: 'p1' });
  });
});
