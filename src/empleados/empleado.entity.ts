import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'empleados' })
export class Empleado {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  puesto: string;
}
