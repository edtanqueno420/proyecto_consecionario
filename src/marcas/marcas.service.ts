
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Marca } from './marca.entity';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';

@Injectable()
export class MarcasService {
  constructor(
    @InjectRepository(Marca)
    private readonly marcaRepo: Repository<Marca>,
  ) {}

  create(dto: CreateMarcaDto) {
    const marca = this.marcaRepo.create(dto);
    return this.marcaRepo.save(marca);
  }

  findAll() {
    return this.marcaRepo.find();
  }

  async findOne(id: number) {
    const marca = await this.marcaRepo.findOne({ where: { id } });
    if (!marca) throw new NotFoundException('Marca no encontrada');
    return marca;
  }

  async update(id: number, dto: UpdateMarcaDto) {
    await this.findOne(id);
    await this.marcaRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.marcaRepo.delete(id);
  }
}
