import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Financiamiento } from './financiamiento.entity';
import { CreateFinanciamientoDto } from './dto/create-financiamiento.dto';
import { UpdateFinanciamientoDto } from './dto/update-financiamiento.dto';

@Injectable()
export class FinanciamientosService {
  constructor(
    @InjectRepository(Financiamiento)
    private financiamientoRepo: Repository<Financiamiento>,
  ) {}

  create(dto: CreateFinanciamientoDto) {
    const cuota = dto.monto / dto.plazoMeses;

    const financiamiento = this.financiamientoRepo.create({
      monto: dto.monto,
      plazoMeses: dto.plazoMeses,
      cuotaMensual: cuota,
      estado: 'solicitado',
    } as any);

    return this.financiamientoRepo.save(financiamiento);
  }

  findAll() {
    return this.financiamientoRepo.find({ relations: ['venta', 'banco'] });
  }

  async findOne(id: number) {
    const financiamiento = await this.financiamientoRepo.findOne({ where: { id } });
    if (!financiamiento) {
      throw new NotFoundException('Financiamiento no encontrado');
    }
    return financiamiento;
  }

  async update(id: number, dto: UpdateFinanciamientoDto) {
    await this.findOne(id);
    await this.financiamientoRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.financiamientoRepo.delete(id);
  }
}
