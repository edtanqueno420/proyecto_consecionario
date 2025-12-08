import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cliente } from 'src/clientes/cliente.entity';
import { Vehiculo } from 'src/vehiculos/vehiculo.entity';
import { Empleado } from 'src/empleados/empleado.entity';

@Entity({ name: 'ventas' })
export class Venta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cliente, { nullable: false })
  cliente: Cliente;

  @ManyToOne(() => Vehiculo, { nullable: false })
  vehiculo: Vehiculo;

  @ManyToOne(() => Empleado, { nullable: true })
  empleado: Empleado;

  @Column('numeric', { precision: 12, scale: 2 })
  precio_final: number;

  @Column({ type: 'date' })
  fecha_venta: string;

  @Column({ default: 'completada' })
  estado: string;
}
