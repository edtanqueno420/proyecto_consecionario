import { Module } from '@nestjs/common';
import { FinanciamientoController } from './financiamiento.controller';
import { FinanciamientoService } from './financiamiento.service';

@Module({
  controllers: [FinanciamientoController],
  providers: [FinanciamientoService]
})
export class FinanciamientoModule {}
