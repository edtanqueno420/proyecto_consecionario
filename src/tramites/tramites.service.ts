import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tramite } from './tramite.entity';
import { TramiteProgreso } from './tramite-progreso.entity';
import { CreateTramiteDto } from './dto/create-tramite.dto';
import { CreateTramiteProgresoDto } from './dto/create-tramite-progreso.dto';

@Injectable()
export class TramitesService {
  constructor(
    @InjectRepository(Tramite)
    private tramiteRepo: Repository<Tramite>,
    @InjectRepository(TramiteProgreso)
    private progresoRepo: Repository<TramiteProgreso>,
  ) {}

  create(dto: CreateTramiteDto) {
    const tramite = this.tramiteRepo.create({
      tipoTramite: dto.tipoTramite,
      estado: 'pendiente',
    } as any);

    return this.tramiteRepo.save(tramite);
  }

  agregarProgreso(dto: CreateTramiteProgresoDto) {
    const progreso = this.progresoRepo.create({
      descripcion: dto.descripcion,
      estado: dto.estado,
      fecha: new Date(),
    } as any);

    return this.progresoRepo.save(progreso);
  }

  findAll() {
    return this.tramiteRepo.find({ relations: ['venta'] });
  }

  async findOne(id: number) {
    const tramite = await this.tramiteRepo.findOne({ where: { id } });
    if (!tramite) throw new NotFoundException('Trámite no encontrado');
    return tramite;
  }
}
