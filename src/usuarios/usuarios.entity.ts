import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Rol } from '../roles/roles.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Rol, rol => rol.usuarios)
  @JoinColumn({ name: 'rol_id' })
  rol: Rol;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellido: string;

  @Column({ type: 'varchar', length: 50 })
  tipo_identificacion: string;

  @Column({ type: 'varchar', length: 15 })
  numero_identificacion: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password_hash: string;

  @Column({ type: 'varchar', length: 10 })
  telefono_celular: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_registro: Date;
}
