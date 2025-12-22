import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type GaleriaDocument = Galeria & Document;

@Schema({ timestamps: true })
export class Galeria {
  @Prop({ type: Types.ObjectId, ref: 'Vehiculo', required: true })
  vehiculo: Types.ObjectId; // referencia al vehículo

  @Prop([
    {
      url: String,
      principal: Boolean,
    },
  ])
  imagenes: { url: string; principal: boolean }[];
}

export const GaleriaSchema = SchemaFactory.createForClass(Galeria);
