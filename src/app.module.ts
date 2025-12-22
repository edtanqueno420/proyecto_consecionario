import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

// ENTIDADES
import { Usuario } from './usuarios/usuario.entity';
import { Marca } from './marcas/marca.entity';
import { Modelo } from './modelos/modelo.entity';
import { Version } from './versiones/version.entity';
import { Vehiculo } from './vehiculos/vehiculo.entity';
import { Accesorio } from './accesorios/accesorios.entity';
import { Venta } from './ventas/venta.entity';
import { Mantenimiento } from './mantenimientos/mantenimientos.entity';

// MÓDULOS
import { UsuariosModule } from './usuarios/usuarios.module';
import { MarcasModule } from './marcas/marcas.module';
import { ModelosModule } from './modelos/modelos.module';
import { VersionesModule } from './versiones/versiones.module';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { AccesoriosModule } from './accesorios/accesorios.module';
import { TestDriveModule } from './test-drive/test-drive.module';
import { VentasModule } from './ventas/ventas.module';
import { TramitesModule } from './tramites/tramites.module';
import { FinanciamientosModule } from './financiamiento/financiamiento.module';
import { GaleriaModule } from './galeria/galeria.module';
import { SolicitudesModule } from './solicitudes/solicitudes.module';
import { MantenimientosModule } from './mantenimientos/mantenimientos.module';
import { AuthModule } from './auth/auth.module';
import { ComparacionesModule } from './comparaciones/comparaciones.module';
import { BancosModule } from './bancos/bancos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // 🔵 POSTGRESQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        entities: [
          Usuario,
          Marca,
          Modelo,
          Version,
          Vehiculo,
          Accesorio,
          Venta,
          Mantenimiento,
        ],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),

    // 🟢 MONGODB
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get('MONGO_URI'),
      }),
    }),

    // MÓDULOS DEL SISTEMA
    UsuariosModule,
    MarcasModule,
    ModelosModule,
    VersionesModule,
    VehiculosModule,
    AccesoriosModule,
    TestDriveModule,
    VentasModule,
    TramitesModule,
    FinanciamientosModule,
    GaleriaModule,
    SolicitudesModule,
    MantenimientosModule,
    AuthModule,
    ComparacionesModule,
    BancosModule,
  ],
})
export class AppModule {}
