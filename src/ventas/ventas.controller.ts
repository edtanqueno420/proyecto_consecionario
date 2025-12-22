import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../auth/roles.enum';


@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Rol.VENDEDOR, Rol.ADMIN)
@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  
  @Post()
  create(@Body() dto: CreateVentaDto) {
    return this.ventasService.create(dto);
  }

  @Get()
  findAll() {
    return this.ventasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ventasService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateVentaDto) {
    return this.ventasService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ventasService.remove(+id);
  }
}
