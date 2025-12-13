import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // <--- FALTABA ESTO
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuarios.entity'; // Ajusta la ruta si es necesario

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])], // <--- Conecta la Entidad a la DB
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService] // <--- VITAL: Permite que Ventas use este servicio
})
export class UsuariosModule {}