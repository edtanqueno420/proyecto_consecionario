import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Usuario } from '../usuarios/usuarios.entity'; // Asegúrate que la ruta sea exacta
import { Vehiculo } from '../vehiculos/vehiculos.entity'; // Verifica esta ruta también

@Entity('ventas')
export class Venta {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 🔴 ANTES: @ManyToOne(() => User)
  // 🟢 AHORA: Debes llamar a la clase Usuario que importaste arriba
  @ManyToOne(() => Usuario) 
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario; // <--- CAMBIO AQUÍ: Tipo 'Usuario', no 'User'

  @OneToOne(() => Vehiculo) 
  @JoinColumn({ name: 'vehiculo_id' })
  vehiculo: Vehiculo;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_final: number;

  @Column({ default: 'CONTADO' })
  metodo_pago: string;

  @CreateDateColumn()
  fecha_venta: Date;
}