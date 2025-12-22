import { Test, TestingModule } from '@nestjs/testing';
import { ComparacionesController } from './comparaciones.controller';
import { ComparacionesService } from './comparaciones.service';

describe('ComparacionesController', () => {
  let controller: ComparacionesController;

  const mockService = {
    create: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComparacionesController],
      providers: [
        {
          provide: ComparacionesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ComparacionesController>(ComparacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
