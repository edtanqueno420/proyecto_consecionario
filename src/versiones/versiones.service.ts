import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Version } from './version.entity';
import { Modelo } from '../modelos/modelo.entity';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';

@Injectable()
export class VersionesService {
  constructor(
    @InjectRepository(Version)
    private readonly versionRepo: Repository<Version>,

    @InjectRepository(Modelo)
    private readonly modeloRepo: Repository<Modelo>,
  ) {}

  async create(dto: CreateVersionDto) {
    const modelo = await this.modeloRepo.findOne({
      where: { id: dto.modeloId },
    });

    if (!modelo) throw new NotFoundException('Modelo no encontrado');

    const version = this.versionRepo.create({
      ...dto,
      modelo,
    });

    return this.versionRepo.save(version);
  }

  findAll() {
    return this.versionRepo.find();
  }

  async findOne(id: number) {
    const version = await this.versionRepo.findOne({ where: { id } });
    if (!version) throw new NotFoundException('Versión no encontrada');
    return version;
  }

  async update(id: number, dto: UpdateVersionDto) {
    const version = await this.findOne(id);

    if (dto.modeloId) {
      const modelo = await this.modeloRepo.findOne({
        where: { id: dto.modeloId },
      });
      if (!modelo) throw new NotFoundException('Modelo no encontrado');
      version.modelo = modelo;
    }

    Object.assign(version, dto);
    return this.versionRepo.save(version);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.versionRepo.delete(id);
  }
}
