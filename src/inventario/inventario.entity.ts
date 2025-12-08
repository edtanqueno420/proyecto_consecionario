import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Vehiculo } from 'src/vehiculos/vehiculo.entity';

@Entity({ name: 'inventario' })
export class Inventario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Vehiculo, veh => veh.id)
  vehiculo: Vehiculo;

  @Column({ nullable: true })
  ubicacion: string;

  @Column('int', { default: 1 })
  stock: number;

  @Column({ default: 'en patio' })
  estado: string;
}
