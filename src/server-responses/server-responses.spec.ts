import { Test, TestingModule } from '@nestjs/testing';
import { ServerResponsesService } from './server-responses.service';

describe('ServerResponsesService', () => {
  let service: ServerResponsesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServerResponsesService],
    }).compile();

    service = module.get<ServerResponsesService>(ServerResponsesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
