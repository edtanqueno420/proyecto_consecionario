import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Modelo } from '../modelos/modelos.entity';

@Entity('marcas')
export class Marca {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 255 })
  logo_url: string;

  @Column({ length: 50 })
  pais_origen: string;

  @OneToMany(() => Modelo, modelo => modelo.marca)
  modelos: Modelo[];
}
