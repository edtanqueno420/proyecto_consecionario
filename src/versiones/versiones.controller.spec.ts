import { Test, TestingModule } from '@nestjs/testing';
import { VersionesController } from './versiones.controller';

describe('VersionesController', () => {
  let controller: VersionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VersionesController],
    }).compile();

    controller = module.get<VersionesController>(VersionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
