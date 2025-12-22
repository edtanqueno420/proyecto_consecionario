import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Types } from 'mongoose';
import { Galeria, GaleriaDocument } from './schemas/galeria.schema';
import { CreateGaleriaDto } from './dto/create-galeria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehiculo } from '../vehiculos/vehiculo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GaleriaService {
  constructor(
    @InjectModel(Galeria.name)
    private readonly galeriaModel: Model<GaleriaDocument>,

    @InjectRepository(Vehiculo)
    private readonly vehiculoRepo: Repository<Vehiculo>,
  ) {}

  // -------------------------
  // Crear galería
  // -------------------------
  async create(dto: CreateGaleriaDto) {
    const vehiculoId = Number(dto.vehiculo);
    if (isNaN(vehiculoId)) throw new NotFoundException('Vehículo inválido');

    const vehiculoExists = await this.vehiculoRepo.findOne({ where: { id: vehiculoId } });
    if (!vehiculoExists) throw new NotFoundException('Vehículo no encontrado');

    const galeria = new this.galeriaModel({
      ...dto,
      vehiculo: vehiculoId.toString(), // Guardamos como string en Mongo
    });

    return galeria.save();
  }

  // -------------------------
  // Obtener todas las galerías
  // -------------------------
  async findAll() {
    const galerias = await this.galeriaModel.find().exec();

    for (const galeria of galerias) {
      const vehiculoId = Number(galeria.vehiculo);
      galeria['vehiculoData'] = isNaN(vehiculoId)
        ? null
        : await this.vehiculoRepo.findOne({ where: { id: vehiculoId } });
    }

    return galerias;
  }

  // -------------------------
  // Obtener galería por ID
  // -------------------------
  async findOne(id: string) {
    const galeria = await this.galeriaModel.findById(id).exec();
    if (!galeria) throw new NotFoundException('Galería no encontrada');

    const vehiculoId = Number(galeria.vehiculo);
    if (isNaN(vehiculoId)) throw new NotFoundException('Vehículo asociado inválido');

    const vehiculo = await this.vehiculoRepo.findOne({ where: { id: vehiculoId } });

    return { ...galeria.toObject(), vehiculoData: vehiculo };
  }

  // -------------------------
  // Obtener galerías por vehículo
  // -------------------------
  async findByVehiculo(vehiculoId: number) {
    const galerias = await this.galeriaModel
      .find({ vehiculo: vehiculoId.toString() })
      .exec();

    if (!galerias || galerias.length === 0) {
      throw new NotFoundException('No se encontraron galerías para este vehículo');
    }

    const vehiculo = await this.vehiculoRepo.findOne({ where: { id: vehiculoId } });

    return galerias.map((g) => ({ ...g.toObject(), vehiculoData: vehiculo }));
  }

  // -------------------------
  // Agregar imagen a galería existente
  // -------------------------
  async addImagen(
    vehiculoId: number,
    imagen: { url: string; principal: boolean },
  ) {
    const galeria = await this.galeriaModel.findOne({ vehiculo: vehiculoId.toString() });
    if (!galeria) throw new NotFoundException('Galería no encontrada');

    galeria.imagenes.push(imagen);
    return galeria.save();
  }

  // -------------------------
  // Actualizar galería
  // -------------------------
  async update(id: string, dto: CreateGaleriaDto) {
    const galeria = await this.galeriaModel.findByIdAndUpdate(id, { ...dto }, { new: true }).exec();
    if (!galeria) throw new NotFoundException('Galería no encontrada');

    const vehiculoId = Number(galeria.vehiculo);
    galeria['vehiculoData'] = isNaN(vehiculoId)
      ? null
      : await this.vehiculoRepo.findOne({ where: { id: vehiculoId } });

    return galeria;
  }

  // -------------------------
  // Eliminar galería
  // -------------------------
  async remove(id: string) {
    const galeria = await this.galeriaModel.findByIdAndDelete(id).exec();
    if (!galeria) throw new NotFoundException('Galería no encontrada');
    return { message: 'Galería eliminada correctamente' };
  }
}
