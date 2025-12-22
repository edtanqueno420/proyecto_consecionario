import { Test, TestingModule } from '@nestjs/testing';
import { ComparacionesService } from './comparaciones.service';

describe('ComparacionesService', () => {
  let service: ComparacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComparacionesService],
    }).compile();

    service = module.get<ComparacionesService>(ComparacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
