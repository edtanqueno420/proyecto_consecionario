import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GaleriaDocument = Galeria & Document;

@Schema({ timestamps: true })
export class Galeria {
  @Prop({ required: true })
  vehiculoId: number; // ID de PostgreSQL

  @Prop({
    type: [
      {
        url: String,
        principal: Boolean,
      },
    ],
    default: [],
  })
  imagenes: {
    url: string;
    principal: boolean;
  }[];
}

export const GaleriaSchema = SchemaFactory.createForClass(Galeria);
