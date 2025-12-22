import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from './venta.entity';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private ventaRepo: Repository<Venta>,
  ) {}

  create(dto: CreateVentaDto) {
    const venta = this.ventaRepo.create({
      precioFinal: dto.precioFinal,
      tipoCompra: dto.tipoCompra,
      estadoVenta: 'iniciada',
      fecha: new Date(),
    } as any);

    return this.ventaRepo.save(venta);
  }

  findAll() {
    return this.ventaRepo.find({ relations: ['usuario', 'vehiculo'] });
  }

  async findOne(id: number) {
    const venta = await this.ventaRepo.findOne({ where: { id } });
    if (!venta) throw new NotFoundException('Venta no encontrada');
    return venta;
  }

  async update(id: number, dto: UpdateVentaDto) {
    await this.findOne(id);
    await this.ventaRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.ventaRepo.delete(id);
  }
}
