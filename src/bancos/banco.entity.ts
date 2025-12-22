import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Financiamiento } from '../financiamiento/financiamiento.entity';

@Entity('bancos')
export class Banco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  tasa_interes_anual: number;

  @Column()
  plazo_maximo_meses: number;

  @Column({ default: true })
  activo: boolean;

  // Relación con financiamiento (opcional, pero realista)
  @OneToMany(() => Financiamiento, f => f.banco)
  financiamientos: Financiamiento[];
}
