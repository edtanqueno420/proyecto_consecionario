import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { Venta } from './venta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venta])],
  controllers: [VentasController],
  providers: [VentasService],
})
export class VentasModule {}
