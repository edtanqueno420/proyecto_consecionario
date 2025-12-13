
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Version } from '../versiones/versiones.entity'; // Asegúrate que la ruta sea correcta
import { Sucursal } from '../sucursales/sucursales.entity';
import { EstadoVehiculo } from './dto/create-vehiculo.dto'; // Importamos el Enum del DTO

@Entity('vehiculos')
export class Vehiculo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  odoo_id: number; // Preparado para integración futura

  @ManyToOne(() => Version, { eager: true }) // eager: true trae los datos de la versión automáticamente
  @JoinColumn({ name: 'version_id' })
  version: Version;

  @ManyToOne(() => Sucursal)
  @JoinColumn({ name: 'sucursal_id' })
  sucursal: Sucursal;

  @Column({ type: 'varchar', length: 17, unique: true }) // UNIQUE para evitar duplicados
  vin_chasis: string;

  @Column({ type: 'varchar', length: 10 })
  placa: string;

  @Column()
  color: string;

  @Column()
  kilometraje: number;

  @Column({ length: 20 })
  condicion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_venta: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  valor_matricula_aprox: number;

  @Column({ type: 'enum', enum: EstadoVehiculo, default: EstadoVehiculo.DISPONIBLE })
  estado: EstadoVehiculo;

  @Column({ type: 'date' })
  fecha_ingreso: Date;
}