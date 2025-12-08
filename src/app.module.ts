import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { Usuario } from './usuarios/usuario.entity';
import { Role } from './roles/role.entity';
import { Marca } from './marcas/marca.entity';
import { Vehiculo } from './vehiculos/vehiculo.entity';
import { Cliente } from './clientes/cliente.entity';
import { Empleado } from './empleados/empleado.entity';
import { Venta } from './ventas/venta.entity';
import { Inventario } from './inventario/inventario.entity';
import { Reserva } from './reservas/reserva.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Usuario, Role, Marca, Vehiculo, Cliente, Empleado, Venta, Inventario, Reserva],
      synchronize: true, // en dev; en producción usar migrations
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Usuario, Role, Marca, Vehiculo, Cliente, Empleado, Venta, Inventario, Reserva]),
  ],
})
export class AppModule {}
