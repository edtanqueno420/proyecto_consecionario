// src/modules/vehiculos/vehiculos.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehiculo } from './vehiculos.entity';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';

@Injectable()
export class VehiculosService {
  constructor(
    @InjectRepository(Vehiculo)
    private vehiculoRepo: Repository<Vehiculo>,
  ) {}

  // Modificado para recibir filtros (Query Params)
  async findAll(marca?: string) {
    const query = this.vehiculoRepo.createQueryBuilder('vehiculo')
      .leftJoinAndSelect('vehiculo.version', 'version')
      .leftJoinAndSelect('version.modelo', 'modelo')
      .leftJoinAndSelect('modelo.marca', 'marca')
      .leftJoinAndSelect('vehiculo.sucursal', 'sucursal');

    if (marca) {
      query.where('marca.nombre ILIKE :marca', { marca: `%${marca}%` });
    }

    return await query.getMany();
  }

  async findOne(id: number) {
    // CORRECCIÓN: Agregado await aquí
    const vehiculo = await this.vehiculoRepo.findOne({
      where: { id },
      relations: ['version', 'sucursal'],
    });

    if (!vehiculo) throw new NotFoundException(`Vehículo con ID ${id} no encontrado`);
    return vehiculo;
  }

  async create(data: CreateVehiculoDto) {
    try {
      const nuevo = this.vehiculoRepo.create({
        ...data,
        version: { id: data.version_id },
        sucursal: { id: data.sucursal_id },
      });
      return await this.vehiculoRepo.save(nuevo);
    } catch (error) {
      // Capturamos error de duplicado (VIN único) para prueba negativa
      if (error.code === '23505') {
        throw new BadRequestException('Ya existe un vehículo registrado con ese VIN');
      }
      throw error;
    }
  }

  async update(id: number, data: UpdateVehiculoDto) {
    const vehiculo = await this.findOne(id); // Reusa la lógica de findOne con el error 404
    this.vehiculoRepo.merge(vehiculo, data); // Merge es mejor que Object.assign para TypeORM
    return await this.vehiculoRepo.save(vehiculo);
  }

  async delete(id: number) {
    const vehiculo = await this.findOne(id);
    return await this.vehiculoRepo.remove(vehiculo);
  }
}