import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Vehiculo } from '../vehiculos/vehiculo.entity';

export enum EstadoTestDrive {
  PENDIENTE = 'PENDIENTE',
  CONFIRMADO = 'CONFIRMADO',
  CANCELADO = 'CANCELADO',
}

@Entity('test_drive')
export class TestDrive {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, { eager: true })
  usuario: Usuario;

  @ManyToOne(() => Vehiculo, { eager: true })
  vehiculo: Vehiculo;

  @Column({ type: 'date' })
  fecha: string;

  @Column({
    type: 'enum',
    enum: EstadoTestDrive,
    default: EstadoTestDrive.PENDIENTE,
  })
  estado: EstadoTestDrive;
}
