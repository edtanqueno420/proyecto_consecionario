// galeria.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GaleriaService } from './galeria.service';
import { GaleriaController } from './galeria.controller';
import { Galeria, GaleriaSchema } from './schemas/galeria.schema';
import { VehiculosModule } from '../vehiculos/vehiculos.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Galeria.name, schema: GaleriaSchema }]),
    VehiculosModule, // ✅ ahora Nest puede inyectar VehiculoRepository
  ],
  controllers: [GaleriaController],
  providers: [GaleriaService],
})
export class GaleriaModule {}
