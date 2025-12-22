import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestDrive } from './test-drive.entity';
import { Vehiculo } from '../vehiculos/vehiculo.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { TestDriveService } from './test-drive.service';
import { TestDriveController } from './test-drive.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TestDrive, Vehiculo, Usuario]),
  ],
  controllers: [TestDriveController],
  providers: [TestDriveService],
})
export class TestDriveModule {}
