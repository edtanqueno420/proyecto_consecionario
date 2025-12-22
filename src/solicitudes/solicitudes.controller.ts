import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { SolicitudesService } from './solicitudes.service';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../auth/roles.enum';
import { EstadoSolicitud } from './schemas/solicitud.schema';

@Controller('solicitudes')
export class SolicitudesController {
  constructor(private readonly solicitudesService: SolicitudesService) {}

  // Crear solicitud (Cliente)
  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles(Rol.CLIENTE, Rol.VENDEDOR)
  @Post()
  create(@Body() dto: CreateSolicitudDto) {
    return this.solicitudesService.create(dto);
  }

  // Listar todas (ADMIN o VENDEDOR)
  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles(Rol.ADMIN, Rol.VENDEDOR)
  @Get()
  findAll() {
    return this.solicitudesService.findAll();
  }

  // Actualizar estado (ADMIN o VENDEDOR)
  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles(Rol.ADMIN, Rol.VENDEDOR)
  @Put(':id/estado/:estado')
  updateEstado(@Param('id') id: string, @Param('estado') estado: EstadoSolicitud) {
    return this.solicitudesService.updateEstado(id, estado);
  }

  // Eliminar solicitud (ADMIN)
  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles(Rol.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solicitudesService.remove(id);
  }
}
