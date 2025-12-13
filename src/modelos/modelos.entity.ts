import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Marca } from '../marcas/marcas.entity';
import { Version } from '../versiones/versiones.entity';

@Entity('modelos')
export class Modelo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Marca, marca => marca.modelos)
  @JoinColumn({ name: 'marca_id' })
  marca: Marca;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 50 })
  tipo_carroceria: string;

  @Column()
  anio_modelo: number;

  @OneToMany(() => Version, version => version.modelo)
  versiones: Version[];
}
