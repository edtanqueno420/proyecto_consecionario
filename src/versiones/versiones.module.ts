import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Version } from './version.entity';
import { Modelo } from '../modelos/modelo.entity';
import { VersionesService } from './versiones.service';
import { VersionesController } from './versiones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Version, Modelo])],
  providers: [VersionesService],
  controllers: [VersionesController],
  exports: [TypeOrmModule],
})
export class VersionesModule {}
