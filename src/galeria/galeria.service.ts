import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Galeria, GaleriaDocument } from './schemas/galeria.schema';
import { CreateGaleriaDto } from './dto/create-galeria.dto';

@Injectable()
export class GaleriaService {
  constructor(
    @InjectModel(Galeria.name)
    private readonly galeriaModel: Model<GaleriaDocument>,
  ) {}

  create(dto: CreateGaleriaDto) {
    return this.galeriaModel.create(dto);
  }

  findByVehiculo(vehiculoId: number) {
    return this.galeriaModel.findOne({ vehiculoId });
  }

  async addImagen(
    vehiculoId: number,
    imagen: { url: string; principal: boolean },
  ) {
    const galeria = await this.findByVehiculo(vehiculoId);

    if (!galeria) {
      throw new NotFoundException('Galería no encontrada');
    }

    galeria.imagenes.push(imagen);
    return galeria.save();
  }
}
