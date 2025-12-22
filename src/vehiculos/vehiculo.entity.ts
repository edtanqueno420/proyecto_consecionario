import {Entity,PrimaryGeneratedColumn,Column, ManyToOne,} from 'typeorm';
import { Version } from '../versiones/version.entity';

export enum EstadoVehiculo {
  DISPONIBLE = 'disponible',
  RESERVADO = 'reservado',
  VENDIDO = 'vendido',
}

@Entity('vehiculos')
export class Vehiculo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  vin: string; // Número de chasis

  @Column()
  color: string;

  @Column({
    type: 'enum',
    enum: EstadoVehiculo,
    default: EstadoVehiculo.DISPONIBLE,
  })
  estado: EstadoVehiculo;

  @Column('decimal')
  precio_final: number;

  @ManyToOne(() => Version, { eager: true })
  version: Version;

}
