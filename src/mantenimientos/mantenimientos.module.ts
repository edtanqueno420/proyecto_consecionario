import { Module } from '@nestjs/common';
import { MantenimientosService } from './mantenimientos.service';

@Module({
  providers: [MantenimientosService]
})
export class MantenimientosModule {}
