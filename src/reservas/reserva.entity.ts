import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cliente } from 'src/clientes/cliente.entity';
import { Vehiculo } from 'src/vehiculos/vehiculo.entity';

@Entity({ name: 'reservas_pruebas' })
export class Reserva {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cliente, cliente => cliente.id, { nullable: false })
  cliente: Cliente;

  @ManyToOne(() => Vehiculo, vehiculo => vehiculo.id, { nullable: false })
  vehiculo: Vehiculo;

  @Column({ type: 'timestamp with time zone' })
  fecha_hora: Date;

  @Column()
  sucursal: string;

  @Column({ default: 'pendiente' })
  estado: string;
}
