import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Modelo } from '../modelos/modelo.entity';

@Entity('marcas')
export class Marca {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column({ default: true })
  activa: boolean;

  @OneToMany(() => Modelo, (modelo) => modelo.marca)
  modelos: Modelo[];
}
