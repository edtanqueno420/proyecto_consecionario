import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marca } from './marca.entity';
import { MarcasService } from './marcas.service';
import { MarcasController } from './marcas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Marca])],
  providers: [MarcasService],
  controllers: [MarcasController],
  exports: [TypeOrmModule],
})
export class MarcasModule {}
