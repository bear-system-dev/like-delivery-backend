import { Test, TestingModule } from '@nestjs/testing';
import { BearHashingService } from './bear-hashing.service';

describe('BearHashingService', () => {
  let service: BearHashingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BearHashingService],
    }).compile();

    service = module.get<BearHashingService>(BearHashingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
