import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  // ✅ Validar vehículo real en Postgres (id es number en tu proyecto)
  private async validarVehiculo(vehiculoId: string) {
    const idNum = Number(vehiculoId);
    if (isNaN(idNum)) throw new NotFoundException('Vehículo inválido');

    const vehiculo = await this.vehiculoRepo.findOne({ where: { id: idNum } });
    if (!vehiculo) throw new NotFoundException('Vehículo no encontrado');

    return vehiculo;
  }

  // -------------------------
  // Crear galería
  // -------------------------
  async create(dto: CreateGaleriaDto) {
    await this.validarVehiculo(dto.vehiculoId);

    // ✅ Solo una imagen puede ser principal
    const imagenes = dto.imagenes.map((img) => ({
      url: img.url,
      principal: !!img.principal,
    }));

    const idxPrincipal = imagenes.findIndex((i) => i.principal);
    if (idxPrincipal !== -1) {
      imagenes.forEach((i, idx) => (i.principal = idx === idxPrincipal));
    }

    const galeria = new this.galeriaModel({
      vehiculoId: dto.vehiculoId,
      imagenes,
    });

    return galeria.save();
  }

  // -------------------------
  // Obtener todas las galerías (con vehiculoData)
  // -------------------------
  async findAll() {
    const galerias = await this.galeriaModel.find().lean().exec();

    const result = await Promise.all(
      galerias.map(async (g: any) => {
        const idNum = Number(g.vehiculoId);
        const vehiculoData = isNaN(idNum)
          ? null
          : await this.vehiculoRepo.findOne({ where: { id: idNum } });

        return { ...g, vehiculoData };
      }),
    );

    return result;
  }

  // -------------------------
  // Obtener galería por ID
  // -------------------------
  async findOne(id: string) {
    const galeria: any = await this.galeriaModel.findById(id).lean().exec();
    if (!galeria) throw new NotFoundException('Galería no encontrada');

    const idNum = Number(galeria.vehiculoId);
    const vehiculoData = isNaN(idNum)
      ? null
      : await this.vehiculoRepo.findOne({ where: { id: idNum } });

    return { ...galeria, vehiculoData };
  }

  // -------------------------
  // Obtener galerías por vehículo
  // -------------------------
  async findByVehiculo(vehiculoId: string) {
    const vehiculoData = await this.validarVehiculo(vehiculoId);

    const galerias = await this.galeriaModel.find({ vehiculoId }).lean().exec();

    if (!galerias.length) {
      throw new NotFoundException('No se encontraron galerías para este vehículo');
    }

    return galerias.map((g: any) => ({ ...g, vehiculoData }));
  }

  // -------------------------
  // Agregar imagen a galería existente
  // -------------------------
  async addImagen(vehiculoId: string, imagen: { url: string; principal: boolean }) {
    await this.validarVehiculo(vehiculoId);

    const galeria = await this.galeriaModel.findOne({ vehiculoId }).exec();
    if (!galeria) throw new NotFoundException('Galería no encontrada');

    if (imagen.principal) {
      galeria.imagenes = galeria.imagenes.map((img: any) => ({
        ...img,
        principal: false,
      })) as any;
    }

    galeria.imagenes.push({
      url: imagen.url,
      principal: !!imagen.principal,
    } as any);

    return galeria.save();
  }

  // -------------------------
  // Actualizar galería
  // -------------------------
  async update(id: string, dto: CreateGaleriaDto) {
    await this.validarVehiculo(dto.vehiculoId);

    const imagenes = dto.imagenes.map((img) => ({
      url: img.url,
      principal: !!img.principal,
    }));

    const idxPrincipal = imagenes.findIndex((i) => i.principal);
    if (idxPrincipal !== -1) {
      imagenes.forEach((i, idx) => (i.principal = idx === idxPrincipal));
    }

    const galeria: any = await this.galeriaModel
      .findByIdAndUpdate(id, { vehiculoId: dto.vehiculoId, imagenes }, { new: true })
      .lean()
      .exec();

    if (!galeria) throw new NotFoundException('Galería no encontrada');

    const idNum = Number(galeria.vehiculoId);
    const vehiculoData = isNaN(idNum)
      ? null
      : await this.vehiculoRepo.findOne({ where: { id: idNum } });

    return { ...galeria, vehiculoData };
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
