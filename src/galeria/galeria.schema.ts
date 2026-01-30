import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GaleriaDocument = Galeria & Document;

@Schema({ _id: false })
export class Imagen {
  @Prop({ required: true })
  url: string;

  @Prop({ default: false })
  principal: boolean;
}

@Schema({ timestamps: true })
export class Galeria {
  @Prop({ required: true })
  vehiculoId: string; // ✅ campo correcto

  @Prop({ type: [Imagen], default: [] })
  imagenes: Imagen[];
}

export const GaleriaSchema = SchemaFactory.createForClass(Galeria);
GaleriaSchema.index({ vehiculoId: 1 });
