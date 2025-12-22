import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinanciamientosService } from './financiamiento.service';
import { FinanciamientosController } from './financiamiento.controller';
import { Financiamiento } from './financiamiento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Financiamiento])],
  controllers: [FinanciamientosController],
  providers: [FinanciamientosService],
})
export class FinanciamientosModule {}
