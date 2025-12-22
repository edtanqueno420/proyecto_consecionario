import {BadRequestException,Injectable,NotFoundException,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comparacion } from './comparacion.entity';
import { ComparacionVehiculo } from './comparacion-vehiculo.entity';
import { Vehiculo } from '../vehiculos/vehiculo.entity';
import { CreateComparacionDto } from './dto/create-comparacion.dto';
import { Usuario } from '../usuarios/usuario.entity';
import { Repository, In } from 'typeorm';


@Injectable()
export class ComparacionesService {
  constructor(
    @InjectRepository(Comparacion)
    private readonly comparacionRepo: Repository<Comparacion>,

    @InjectRepository(ComparacionVehiculo)
    private readonly compVehRepo: Repository<ComparacionVehiculo>,

    @InjectRepository(Vehiculo)
    private readonly vehiculoRepo: Repository<Vehiculo>,
  ) {}

  async create(dto: CreateComparacionDto, userId: number) {
    if (dto.vehiculosIds.length > 3) {
      throw new BadRequestException('Solo se permiten hasta 3 vehículos');
    }

    const comparacion = this.comparacionRepo.create({
      fecha: new Date(),
      usuario: { id: userId } as any,
    });

    await this.comparacionRepo.save(comparacion);

    const vehiculos = await this.vehiculoRepo.findBy({
      id: In(dto.vehiculosIds),
    });

    for (const vehiculo of vehiculos) {
      await this.compVehRepo.save({
        comparacion,
        vehiculo,
      });
    }

    return this.findOne(comparacion.id, userId);
  }

  async findOne(id: number, userId: number) {
    const comparacion = await this.comparacionRepo.findOne({
      where: {
        id,
        usuario: { id: userId },
      },
      relations: [
        'vehiculos',
        'vehiculos.vehiculo',
        'vehiculos.vehiculo.version',
      ],
    });

    if (!comparacion) {
      throw new NotFoundException('Comparación no encontrada');
    }

    return comparacion;
  }

  async remove(id: number, userId: number) {
    const comparacion = await this.comparacionRepo.findOne({
      where: { id, usuario: { id: userId } },
    });

    if (!comparacion) {
      throw new NotFoundException('Comparación no encontrada');
    }

    await this.comparacionRepo.delete(id);
    return { message: 'Comparación eliminada correctamente' };
  }
}
