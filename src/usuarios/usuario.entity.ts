import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Rol } from '../auth/roles.enum';
import { Comparacion } from '../comparaciones/comparacion.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Rol, default: Rol.CLIENTE })
  rol: Rol;

  // 🔹 Relación con comparaciones
  @OneToMany(() => Comparacion, (comparacion) => comparacion.usuario)
  comparaciones: Comparacion[];
}
