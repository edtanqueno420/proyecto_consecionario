import { Test, TestingModule } from '@nestjs/testing';
import { FinanciamientosController } from './financiamiento.controller';

describe('FinanciamientosController', () => {
  let controller: FinanciamientosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinanciamientosController],
    }).compile();

    controller = module.get<FinanciamientosController>(FinanciamientosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
