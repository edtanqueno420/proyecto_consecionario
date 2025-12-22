import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TramitesService } from './tramites.service';
import { TramitesController } from './tramites.controller';
import { Tramite } from './tramite.entity';
import { TramiteProgreso } from './tramite-progreso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tramite, TramiteProgreso])],
  controllers: [TramitesController],
  providers: [TramitesService],
})
export class TramitesModule {}
