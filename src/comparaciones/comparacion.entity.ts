import {Entity,PrimaryGeneratedColumn,ManyToOne,OneToMany,Column,JoinColumn,} from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { ComparacionVehiculo } from './comparacion-vehiculo.entity';

@Entity('comparaciones')
export class Comparacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.comparaciones, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @OneToMany(
    () => ComparacionVehiculo,
    (cv) => cv.comparacion,
    { cascade: true },
  )
  vehiculos: ComparacionVehiculo[];
}
