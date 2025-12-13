import { Controller, Post, Body } from '@nestjs/common';
import { VentasService } from './ventas.service'; // Importar el nombre correcto
import { CreateSaleDto } from './dto/create-ventas.dto';

@Controller('sales') // O 'ventas', como prefieras la URL
export class VentasController {
  constructor(private readonly ventasService: VentasService) {} // Inyección correcta

  @Post()
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.ventasService.create(createSaleDto);
  }
}