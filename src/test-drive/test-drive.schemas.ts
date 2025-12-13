import { Schema } from 'mongoose';

export const CitaTestDriveSchema = new Schema({
  usuario_id: Number,
  vehiculo_id: Number,
  sucursal_id: Number,

  fecha_hora: Date,
  estado: { type: String, default: 'pendiente' },

  notificacion_whatsapp_enviada: { type: Boolean, default: false },
}, { timestamps: true });
