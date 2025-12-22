import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Venta } from '../ventas/venta.entity';
import { Banco } from '../bancos/banco.entity';


@Entity('financiamientos')
export class Financiamiento {
@PrimaryGeneratedColumn()
id: number;


@ManyToOne(() => Venta)
venta: Venta;


@ManyToOne(() => Banco)
banco: Banco;


@Column('decimal')
monto: number;


@Column()
plazoMeses: number;


@Column('decimal')
cuotaMensual: number;


@Column()
estado: string; // solicitado | aprobado | rechazado
}