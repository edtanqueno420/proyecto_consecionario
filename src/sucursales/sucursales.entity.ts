import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sucursales')
export class Sucursal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 255 })
  direccion: string;

  @Column({ length: 100 })
  ciudad: string;

  @Column({ length: 20 })
  telefono_contacto: string;
}
