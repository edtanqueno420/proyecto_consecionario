import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tramite } from './tramite.entity';


@Entity('tramites_progreso')
export class TramiteProgreso {
@PrimaryGeneratedColumn()
id: number;


@ManyToOne(() => Tramite)
tramite: Tramite;


@Column()
descripcion: string;


@Column()
estado: string;


@Column()
fecha: Date;
}