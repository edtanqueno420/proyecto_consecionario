import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComparacionesService } from './comparaciones.service';
import { ComparacionesController } from './comparaciones.controller';
import { Comparacion } from './comparacion.entity';
import { ComparacionVehiculo } from './comparacion-vehiculo.entity';
import { Vehiculo } from '../vehiculos/vehiculo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Comparacion,
      ComparacionVehiculo,
      Vehiculo,
    ]),
  ],
  controllers: [ComparacionesController],
  providers: [ComparacionesService],
})
export class ComparacionesModule {}
