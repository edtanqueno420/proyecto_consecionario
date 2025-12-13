import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Venta } from '../ventas/ventas.entity';

@Entity('mantenimientos')
export class Mantenimiento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Venta)
  @JoinColumn({ name: 'venta_id' })
  venta: Venta;

  @Column({ type: 'date' })
  fecha_estimada: Date;

  @Column()
  kilometraje_estimado: number;

  @Column({ length: 100 })
  tipo_servicio: string;

  @Column({ length: 20 })
  estado: string;
}
