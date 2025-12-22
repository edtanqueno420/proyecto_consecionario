import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Vehiculo } from '../vehiculos/vehiculo.entity';


@Entity('ventas')
export class Venta {
@PrimaryGeneratedColumn()
id: number;


@ManyToOne(() => Usuario)
usuario: Usuario;


@ManyToOne(() => Vehiculo)
vehiculo: Vehiculo;


@Column('decimal')
precioFinal: number;


@Column()
tipoCompra: string; // contado | credito


@Column()
estadoVenta: string; // iniciada | aprobada | entregada


@Column()
fecha: Date;
}