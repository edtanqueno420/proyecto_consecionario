import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Modelo } from '../modelos/modelos.entity';

@Entity('versiones')
export class Version {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Modelo, modelo => modelo.versiones)
  @JoinColumn({ name: 'modelo_id' })
  modelo: Modelo;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_base: number;

  @Column({ type: 'json' })
  ficha_tecnica_json: any;
}
