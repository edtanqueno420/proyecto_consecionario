import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('bancos_financiamiento')
export class BancoFinanciamiento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 90 })
  nombre_banco: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  tasa_interes_anual: number;

  @Column()
  plazo_maximo_meses: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  entrada_minima_porcentaje: number;

  @Column({ type: 'boolean' })
  requiere_seguro: boolean;
}
