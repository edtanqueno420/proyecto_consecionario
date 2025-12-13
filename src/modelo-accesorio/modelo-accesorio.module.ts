import { Module } from '@nestjs/common';
import { ModeloAccesorioController } from './modelo-accesorio.controller';
import { ModeloAccesorioService } from './modelo-accesorio.service';

@Module({
  controllers: [ModeloAccesorioController],
  providers: [ModeloAccesorioService]
})
export class ModeloAccesorioModule {}
