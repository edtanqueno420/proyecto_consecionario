import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('accesorios')
export class Accesorio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column({ length: 50 })
  categoria: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;
}
