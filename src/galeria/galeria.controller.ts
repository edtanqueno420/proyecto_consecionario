import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { GaleriaService } from './galeria.service';
import { CreateGaleriaDto } from './dto/create-galeria.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../auth/roles.enum';

@Controller('galeria')
export class GaleriaController {
  constructor(private readonly galeriaService: GaleriaService) {}

  // -------------------------
  // Crear galería (ADMIN o VENDEDOR)
  // -------------------------
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN, Rol.VENDEDOR)
  @Post()
  create(@Body() dto: CreateGaleriaDto) {
    return this.galeriaService.create(dto);
  }

  // -------------------------
  // Obtener todas las galerías (público)
  // -------------------------
  @Get()
  findAll() {
    return this.galeriaService.findAll();
  }

  // -------------------------
  // Obtener galería por ID (público)
  // -------------------------
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galeriaService.findOne(id);
  }

  // -------------------------
  // Obtener galerías por vehículo (público)
  // -------------------------
  @Get('vehiculo/:vehiculoId')
  findByVehiculo(@Param('vehiculoId') vehiculoId: string) {
    return this.galeriaService.findByVehiculo((+vehiculoId));
  }

  // -------------------------
  // Actualizar galería (ADMIN o VENDEDOR)
  // -------------------------
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN, Rol.VENDEDOR)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateGaleriaDto) {
    return this.galeriaService.update(id, dto);
  }

  // -------------------------
  // Eliminar galería (ADMIN o VENDEDOR)
  // -------------------------
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN, Rol.VENDEDOR)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galeriaService.remove(id);
  }
}
