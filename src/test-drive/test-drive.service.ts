import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestDrive } from './test-drive.entity';
import { CreateTestDriveDto } from './dto/create-test-drive.dto';
import { Vehiculo } from '../vehiculos/vehiculo.entity';

@Injectable()
export class TestDriveService {
  constructor(
    @InjectRepository(TestDrive)
    private readonly testDriveRepo: Repository<TestDrive>,

    @InjectRepository(Vehiculo)
    private readonly vehiculoRepo: Repository<Vehiculo>,
  ) {}

  public async create(dto: CreateTestDriveDto) {
    const vehiculo = await this.vehiculoRepo.findOne({
      where: { id: dto.vehiculoId },
    });

    if (!vehiculo) throw new NotFoundException('Vehículo no encontrado');

    const testDrive = this.testDriveRepo.create({
      nombre: dto.nombre,
      email: dto.email,
      telefono: dto.telefono,
      fecha: dto.fecha,
      hora: dto.hora,
      estado: 'pendiente',
      vehiculo, // ✅ esto sí existe en tu entidad
    });

    return this.testDriveRepo.save(testDrive);
  }
}
