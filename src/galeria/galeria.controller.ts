import {
  Controller,
  Post,
  Get,
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

  // Crear galería (ADMIN o VENDEDOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN, Rol.VENDEDOR)
  @Post()
  create(@Body() dto: CreateGaleriaDto) {
    return this.galeriaService.create(dto);
  }

  // Obtener galería por vehículo (público)
  @Get('vehiculo/:vehiculoId')
  findByVehiculo(@Param('vehiculoId') vehiculoId: number) {
    return this.galeriaService.findByVehiculo(+vehiculoId);
  }
}
