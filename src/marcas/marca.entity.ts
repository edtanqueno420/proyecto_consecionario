import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Vehiculo } from 'src/vehiculos/vehiculo.entity';

@Entity({ name: 'marcas' })
export class Marca {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  pais: string;

  @OneToMany(() => Vehiculo, vehiculo => vehiculo.marca)
  vehiculos: Vehiculo[];
}
