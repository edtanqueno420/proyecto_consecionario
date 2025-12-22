import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modelo } from './modelo.entity';
import { Marca } from '../marcas/marca.entity';
import { ModelosService } from './modelos.service';
import { ModelosController } from './modelos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Modelo, Marca])],
  providers: [ModelosService],
  controllers: [ModelosController],
  exports: [TypeOrmModule],
})
export class ModelosModule {}
