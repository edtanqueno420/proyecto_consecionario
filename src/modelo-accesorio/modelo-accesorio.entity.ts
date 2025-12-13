import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Modelo } from '../modelos/modelos.entity';
import { Accesorio } from '../accesorios/accesorios.entity';

@Entity('modelo_accesorios')
export class ModeloAccesorio {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Modelo)
  @JoinColumn({ name: 'modelo_id' })
  modelo: Modelo;

  @ManyToOne(() => Accesorio)
  @JoinColumn({ name: 'accesorio_id' })
  accesorio: Accesorio;
}
