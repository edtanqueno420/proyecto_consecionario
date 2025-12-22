import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banco } from './banco.entity';
import { BancosService } from './bancos.service';
import { BancosController } from './bancos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Banco])],
  providers: [BancosService],
  controllers: [BancosController],
  exports: [TypeOrmModule],
})
export class BancosModule {}
