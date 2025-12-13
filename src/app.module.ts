import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

// ENTIDADES POSTGRESQL
import { Usuario } from './usuarios/usuarios.entity';
import { Rol } from './roles/roles.entity';
import { Marca } from './marcas/marcas.entity';
import { Modelo } from './modelos/modelos.entity';
import { Version } from './versiones/versiones.entity';
import { Vehiculo } from './vehiculos/vehiculos.entity';
import { Sucursal } from './sucursales/sucursales.entity';
import { Accesorio } from './accesorios/accesorios.entity';
import { ModeloAccesorio } from './modelo-accesorio/modelo-accesorio.entity';
import { Venta } from './ventas/ventas.entity';
import { Mantenimiento } from './mantenimientos/mantenimientos.entity';
import { TramiteProgreso } from './tramites/tramites.entity';
import { BancoFinanciamiento } from './financiamiento/financiamiento.entity';

// MÓDULOS (Carpetas)
import { RolesModule } from './roles/roles.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MarcasModule } from './marcas/marcas.module';
import { ModelosModule } from './modelos/modelos.module';
import { VersionesModule } from './versiones/versiones.module';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { SucursalesModule } from './sucursales/sucursales.module';
import { AccesoriosModule } from './accesorios/accesorios.module';
import { ModeloAccesorioModule } from './modelo-accesorio/modelo-accesorio.module';
import { TestDriveModule } from './test-drive/test-drive.module';
import { VentasModule } from './ventas/ventas.module';
import { TramitesModule } from './tramites/tramites.module';
import { FinanciamientoModule } from './financiamiento/financiamiento.module';
import { GaleriaModule } from './galeria/galeria.module';
import { SolicitudesModule } from './solicitudes/solicitudes.module';
import { MantenimientosModule } from './mantenimientos/mantenimientos.module';
import { AuthModule } from './auth/auth.module';

// CONTROLADORES

@Module({
  imports: [
    // 1. Cargar Configuración Globalmente
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: '.env', // Asegura que lea el archivo explícitamente
    }),

    // 🔵 POSTGRESQL (Corregido a ASYNC y con tus nombres de variables)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // AQUÍ ESTABA EL ERROR: Ahora usamos los nombres de tu .env
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'), // <--- OJO AQUÍ: DB_PASS
        database: configService.get<string>('DB_NAME'),
        entities: [
          Usuario, Rol, Marca, Modelo, Version, Vehiculo, Sucursal,
          Accesorio, ModeloAccesorio, Venta, Mantenimiento, 
          TramiteProgreso, BancoFinanciamiento,
        ],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),

    // 🟢 MONGODB (Ya estaba bien, lo dejamos igual)
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI')
      }),
      inject: [ConfigService],
    }),
    // MÓDULOS DEL PROYECTO
    RolesModule,
    UsuariosModule,
    MarcasModule,
    ModelosModule,
    VersionesModule,
    VehiculosModule,
    SucursalesModule,
    AccesoriosModule,
    ModeloAccesorioModule,
    TestDriveModule,
    VentasModule,
    TramitesModule,
    FinanciamientoModule,
    GaleriaModule,
    SolicitudesModule,
    MantenimientosModule,
    AuthModule,
  ],

  controllers: [
    
  ],
})
export class AppModule {}
