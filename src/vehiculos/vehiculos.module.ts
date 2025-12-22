import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculosService } from './vehiculos.service';
import { VehiculosController } from './vehiculos.controller';
import { Vehiculo } from './vehiculo.entity';
import { Version } from '../versiones/version.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehiculo, Version]),
  ],
  controllers: [VehiculosController],
  providers: [VehiculosService],
  exports: [VehiculosService,TypeOrmModule],
})
export class VehiculosModule {}
