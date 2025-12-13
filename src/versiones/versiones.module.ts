import { Module } from '@nestjs/common';
import { VersionesController } from './versiones.controller';
import { VersionesService } from './versiones.service';

@Module({
  controllers: [VersionesController],
  providers: [VersionesService]
})
export class VersionesModule {}
