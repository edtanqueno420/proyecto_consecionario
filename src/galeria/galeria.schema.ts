import { Schema } from 'mongoose';

export const GaleriaMultimediaSchema = new Schema({
  vehiculo_id: { type: Number, required: true }, // Sí guardamos el ID del vehículo
  url_archivo: { type: String, required: true },
  tipo_archivo: { type: String, enum: ['imagen', 'video'], required: true },
  orden: { type: Number, default: 1 },
  metadata: { type: Object }, // flexible
}, { timestamps: true });
