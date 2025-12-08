import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Marca } from 'src/marcas/marca.entity';

@Entity({ name: 'vehiculos' })
export class Vehiculo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, unique: true })
  vin: string;

  @Column()
  modelo: string;

  @Column()
  tipo: string; // 'auto' | 'moto'

  @Column('int')
  anio: number;

  @Column('numeric', { precision: 12, scale: 2 })
  precio: number;

  @Column({ default: true })
  disponible: boolean;

  @ManyToOne(() => Marca, marca => marca.vehiculos, { eager: true })
  marca: Marca;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;
}
3