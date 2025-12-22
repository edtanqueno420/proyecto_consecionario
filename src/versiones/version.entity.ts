import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,} from 'typeorm';
import { Modelo } from '../modelos/modelo.entity';

@Entity('versiones')
export class Version {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string; // Ej: LX, EX, Sport

  @Column()
  anio: number;

  @Column()
  motor: string; // Ej: 2.0L

  @Column()
  transmision: string; // Manual / Automática

  @Column()
  combustible: string; // Gasolina / Híbrido

  @Column('decimal')
  precio: number;

  @Column({ default: true })
  activa: boolean;

  @ManyToOne(() => Modelo, (modelo) => modelo.versiones, { eager: true })
  modelo: Modelo;
}
