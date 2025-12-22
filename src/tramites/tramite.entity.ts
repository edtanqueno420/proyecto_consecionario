import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Venta } from '../ventas/venta.entity';

@Entity('tramites')
export class Tramite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Venta)
  venta: Venta;

  @Column()
  tipoTramite: string; // matricula | traspaso | ANT

  @Column()
  estado: string; // pendiente | en_proceso | completado
}
