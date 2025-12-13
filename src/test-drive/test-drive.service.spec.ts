import { Test, TestingModule } from '@nestjs/testing';
import { TestDriveService } from './test-drive.service';

describe('TestDriveService', () => {
  let service: TestDriveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestDriveService],
    }).compile();

    service = module.get<TestDriveService>(TestDriveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
