import { Schema } from 'mongoose';

export const SolicitudRetomaSchema = new Schema({
  usuario_id: Number,

  marca_actual: String,
  modelo_actual: String,
  anio_actual: Number,
  kilometraje_actual: Number,

  estado_estetico: String,

  fotos_url: [String],

  precio_estimado_inicial: Number,
  precio_oferta_final: Number,

  estado: { type: String, default: 'pendiente' },
}, { timestamps: true });
