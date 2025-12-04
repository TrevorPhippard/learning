import { Test, TestingModule } from "@nestjs/testing";
import { AppService } from "./app.service";

describe("AppService", () => {
  let service: AppService;

  const mockClient = {
    send: jest.fn(),
    emit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        { provide: "USERS_SERVICE", useValue: mockClient },
        { provide: "POSTS_SERVICE", useValue: mockClient },
        { provide: "FEED_SERVICE", useValue: mockClient },
        { provide: "MESSAGING_SERVICE", useValue: mockClient },

        { provide: "USERS_EVENTS", useValue: mockClient },
        { provide: "POSTS_EVENTS", useValue: mockClient },
        { provide: "FEED_EVENTS", useValue: mockClient },
        { provide: "SEARCH_EVENTS", useValue: mockClient },
        { provide: "MESSAGING_EVENTS", useValue: mockClient },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it("should request a user profile via RPC", () => {
    service.getUserProfile("123");
    expect(mockClient.send).toHaveBeenCalledWith("user.profile.get", {
      userId: "123",
    });
  });

  it("should emit async post created events", () => {
    const post = { id: "p42", authorId: "u10" };
    service.emitPostCreatedEvent(post);

    expect(mockClient.emit).toHaveBeenCalledWith("post.created", post);
    expect(mockClient.emit).toHaveBeenCalledWith("feed.rebuild", {
      postId: "p42",
      authorId: "u10",
    });
    expect(mockClient.emit).toHaveBeenCalledWith("search.index.post", {
      postId: "p42",
    });
  });
});
