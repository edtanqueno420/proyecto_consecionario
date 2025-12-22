import { Module } from '@nestjs/common';
import { AccesoriosController } from './accesorios.controller';
import { AccesoriosService } from './accesorios.service';

@Module({
  controllers: [AccesoriosController],
  providers: [AccesoriosService]
})
export class AccesoriosModule {}
