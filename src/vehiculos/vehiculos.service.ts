import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehiculo } from './vehiculo.entity';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { Version } from '../versiones/version.entity';

@Injectable()
export class VehiculosService {
  constructor(
    @InjectRepository(Vehiculo)
    private vehiculoRepo: Repository<Vehiculo>,

    @InjectRepository(Version)
    private versionRepo: Repository<Version>,
  ) {}

  async create(dto: CreateVehiculoDto) {
    const version = await this.versionRepo.findOne({
      where: { id: dto.versionId },
    });

    if (!version) {
      throw new NotFoundException('Versión no encontrada');
    }

    const vehiculo = this.vehiculoRepo.create({
      vin: dto.vin,
      color: dto.color,
      precio_final: dto.precio_final,
      version,
    });

    return this.vehiculoRepo.save(vehiculo);
  }

  findAll() {
    return this.vehiculoRepo.find();
  }

  async findOne(id: number) {
    const vehiculo = await this.vehiculoRepo.findOne({
      where: { id },
    });

    if (!vehiculo) {
      throw new NotFoundException('Vehículo no encontrado');
    }

    return vehiculo;
  }

  async update(id: number, dto: UpdateVehiculoDto) {
    const vehiculo = await this.findOne(id);

    if (dto.versionId) {
      const version = await this.versionRepo.findOne({
        where: { id: dto.versionId },
      });

      if (!version) {
        throw new NotFoundException('Versión no encontrada');
      }

      vehiculo.version = version;
    }

    Object.assign(vehiculo, dto);

    return this.vehiculoRepo.save(vehiculo);
  }

  async remove(id: number) {
    const vehiculo = await this.findOne(id);
    return this.vehiculoRepo.remove(vehiculo);
  }
}
