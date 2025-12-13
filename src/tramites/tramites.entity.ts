import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Venta } from '../ventas/ventas.entity';

@Entity('tramites_progreso')
export class TramiteProgreso {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Venta)
  @JoinColumn({ name: 'venta_id' })
  venta: Venta;

  @Column({ length: 50 })
  etapa: string;

  @Column({ length: 20 })
  estado: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_actualizacion: Date;

  @Column({ type: 'text', nullable: true })
  observaciones: string;
}
