import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <--- 1. Importar TypeORM
import { VehiculosService } from './vehiculos.service';
import { VehiculosController } from './vehiculos.controller';
import { Vehiculo } from './vehiculos.entity'; // <--- 2. Importar tu Entidad (Asegúrate que la ruta coincida con tu archivo real)

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehiculo]) // <--- 3. ¡ESTO ES LO QUE FALTABA!
  ],
  controllers: [VehiculosController],
  providers: [VehiculosService],
  exports: [VehiculosService] // <--- Útil si otros módulos necesitan consultar vehículos
})
export class VehiculosModule {}