import { Test, TestingModule } from '@nestjs/testing';
import { ModeloAccesorioService } from './modelo-accesorio.service';

describe('ModeloAccesorioService', () => {
  let service: ModeloAccesorioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModeloAccesorioService],
    }).compile();

    service = module.get<ModeloAccesorioService>(ModeloAccesorioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
