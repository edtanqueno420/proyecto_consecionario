import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SolicitudDocument = Solicitud & Document;

export enum EstadoSolicitud {
  PENDIENTE = 'PENDIENTE',
  ACEPTADA = 'ACEPTADA',
  RECHAZADA = 'RECHAZADA',
}

@Schema({ timestamps: true })
export class Solicitud {
  @Prop({ required: true })
  usuarioId: number; // ID del usuario que solicita la retoma

  @Prop({ required: true })
  vehiculoActual: string; // descripción / marca y modelo del vehículo a retomar

  @Prop()
  valorEstimado?: number; // opcional, si ya se calculó el valor de retoma

  @Prop({ enum: EstadoSolicitud, default: EstadoSolicitud.PENDIENTE })
  estado: EstadoSolicitud;

  @Prop()
  observaciones?: string; // comentarios del cliente o vendedor
}

export const SolicitudSchema = SchemaFactory.createForClass(Solicitud);
