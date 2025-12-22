import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Modelo } from './modelo.entity';
import { Marca } from '../marcas/marca.entity';
import { CreateModeloDto } from './dto/create-modelo.dto';
import { UpdateModeloDto } from './dto/update-modelo.dto';

@Injectable()
export class ModelosService {
  constructor(
    @InjectRepository(Modelo)
    private readonly modeloRepo: Repository<Modelo>,

    @InjectRepository(Marca)
    private readonly marcaRepo: Repository<Marca>,
  ) {}

  async create(dto: CreateModeloDto) {
    const marca = await this.marcaRepo.findOne({
      where: { id: dto.marcaId },
    });

    if (!marca) throw new NotFoundException('Marca no encontrada');

    const modelo = this.modeloRepo.create({
      nombre: dto.nombre,
      marca,
    });

    return this.modeloRepo.save(modelo);
  }

  findAll() {
    return this.modeloRepo.find();
  }

  async findOne(id: number) {
    const modelo = await this.modeloRepo.findOne({ where: { id } });
    if (!modelo) throw new NotFoundException('Modelo no encontrado');
    return modelo;
  }

  async update(id: number, dto: UpdateModeloDto) {
    const modelo = await this.findOne(id);

    if (dto.marcaId) {
      const marca = await this.marcaRepo.findOne({
        where: { id: dto.marcaId },
      });
      if (!marca) throw new NotFoundException('Marca no encontrada');
      modelo.marca = marca;
    }

    Object.assign(modelo, dto);
    return this.modeloRepo.save(modelo);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.modeloRepo.delete(id);
  }
}
