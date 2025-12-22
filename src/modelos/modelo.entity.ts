import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,OneToMany,} from 'typeorm';
import { Marca } from '../marcas/marca.entity';
import { Version } from '../versiones/version.entity';

@Entity('modelos')
export class Modelo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ default: true })
  activo: boolean;

  @ManyToOne(() => Marca, (marca) => marca.modelos, { eager: true })
  marca: Marca;

  @OneToMany(() => Version, (version) => version.modelo)
  versiones: Version[];
}
