import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestDrive, EstadoTestDrive } from './test-drive.entity';
import { Vehiculo, EstadoVehiculo } from '../vehiculos/vehiculo.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { CreateTestDriveDto } from './dto/create-test-drive.dto';
import { UpdateTestDriveDto } from './dto/update-test-drive.dto';

@Injectable()
export class TestDriveService {
  constructor(
    @InjectRepository(TestDrive)
    private testDriveRepo: Repository<TestDrive>,

    @InjectRepository(Vehiculo)
    private vehiculoRepo: Repository<Vehiculo>,

    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  // 🔹 Crear test drive
  public async create(dto: CreateTestDriveDto, userId: number) {
    const vehiculo = await this.vehiculoRepo.findOne({
      where: { id: dto.vehiculoId },
    });

    if (!vehiculo) {
      throw new NotFoundException('Vehículo no encontrado');
    }

    if (vehiculo.estado !== EstadoVehiculo.DISPONIBLE) {
      throw new BadRequestException(
        'El vehículo no está disponible para test drive',
      );
    }

    const usuario = await this.usuarioRepo.findOne({
      where: { id: userId },
    });

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const testDrive = this.testDriveRepo.create({
      vehiculo,
      usuario,
      fecha: dto.fecha,
      estado: EstadoTestDrive.PENDIENTE,
    });

    vehiculo.estado = EstadoVehiculo.RESERVADO;
    await this.vehiculoRepo.save(vehiculo);

    return this.testDriveRepo.save(testDrive);
  }

  // 🔹 Obtener todos los test drives
  public async findAll() {
    return this.testDriveRepo.find({ relations: ['vehiculo', 'usuario'] });
  }

  // 🔹 Actualizar test drive
  public async update(id: number, dto: UpdateTestDriveDto) {
    const testDrive = await this.testDriveRepo.findOne({
      where: { id },
      relations: ['vehiculo'],
    });

    if (!testDrive) {
      throw new NotFoundException('Test drive no encontrado');
    }

    testDrive.estado = dto.estado;

    // Si se cancela, liberar el vehículo
    if (dto.estado === EstadoTestDrive.CANCELADO) {
      testDrive.vehiculo.estado = EstadoVehiculo.DISPONIBLE;
      await this.vehiculoRepo.save(testDrive.vehiculo);
    }

    return this.testDriveRepo.save(testDrive);
  }

  // 🔹 Eliminar test drive
  public async remove(id: number) {
    const testDrive = await this.testDriveRepo.findOne({ where: { id } });

    if (!testDrive) {
      throw new NotFoundException('Test drive no encontrado');
    }

    return this.testDriveRepo.delete(id);
  }
}
