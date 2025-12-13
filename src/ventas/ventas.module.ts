import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <--- 1. Importar TypeORM
import { VentasController } from './ventas.controller';
import { VentasService } from './ventas.service';
import { Venta } from './ventas.entity'; // <--- 2. Importar tu entidad

@Module({
  imports: [
    TypeOrmModule.forFeature([Venta]) // <--- 3. VITAL: Registra la tabla en este módulo
  ],
  controllers: [VentasController],
  providers: [VentasService],
})
export class VentasModule {}