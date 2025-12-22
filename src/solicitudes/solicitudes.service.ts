import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Solicitud, SolicitudDocument, EstadoSolicitud } from './schemas/solicitud.schema';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';

@Injectable()
export class SolicitudesService {
  constructor(
    @InjectModel(Solicitud.name)
    private readonly solicitudModel: Model<SolicitudDocument>,
  ) {}

  create(dto: CreateSolicitudDto) {
    return this.solicitudModel.create(dto);
  }

  findAll() {
    return this.solicitudModel.find();
  }

  findOne(id: string) {
    return this.solicitudModel.findById(id);
  }

  async updateEstado(id: string, estado: EstadoSolicitud) {
    const solicitud = await this.findOne(id);
    if (!solicitud) {
      throw new NotFoundException('Solicitud no encontrada');
    }
    solicitud.estado = estado;
    return solicitud.save();
  }

  async remove(id: string) {
    const solicitud = await this.findOne(id);
    if (!solicitud) {
      throw new NotFoundException('Solicitud no encontrada');
    }
    return this.solicitudModel.deleteOne({ _id: id });
  }
}
