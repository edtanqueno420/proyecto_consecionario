import { Test, TestingModule } from '@nestjs/testing';
import { ModeloAccesorioController } from './modelo-accesorio.controller';

describe('ModeloAccesorioController', () => {
  let controller: ModeloAccesorioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModeloAccesorioController],
    }).compile();

    controller = module.get<ModeloAccesorioController>(ModeloAccesorioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
