import { Test, TestingModule } from '@nestjs/testing';
import { FinanciamientoController } from './financiamiento.controller';

describe('FinanciamientoController', () => {
  let controller: FinanciamientoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinanciamientoController],
    }).compile();

    controller = module.get<FinanciamientoController>(FinanciamientoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
