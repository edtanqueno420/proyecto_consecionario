import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Galeria, GaleriaSchema } from './schemas/galeria.schema';
import { GaleriaService } from './galeria.service';
import { GaleriaController } from './galeria.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Galeria.name, schema: GaleriaSchema },
    ]),
  ],
  providers: [GaleriaService],
  controllers: [GaleriaController],
})
export class GaleriaModule {}
