import { Test, TestingModule } from '@nestjs/testing';
import { MantenimientossController } from './mantenimientos.controller';

describe('MantenimientossController', () => {
  let controller: MantenimientossController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MantenimientossController],
    }).compile();

    controller = module.get<MantenimientossController>(MantenimientossController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
