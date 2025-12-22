import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Comparacion } from './comparacion.entity';
import { Vehiculo } from '../vehiculos/vehiculo.entity';

@Entity('comparacion_vehiculos')
export class ComparacionVehiculo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Comparacion, c => c.vehiculos)
  comparacion: Comparacion;

  @ManyToOne(() => Vehiculo)
  vehiculo: Vehiculo;
}
