import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { FinanciamientosService } from './financiamiento.service';
import { CreateFinanciamientoDto } from './dto/create-financiamiento.dto';
import { UpdateFinanciamientoDto } from './dto/update-financiamiento.dto';

@Controller('financiamientos')
export class FinanciamientosController {
  constructor(private readonly financiamientosService: FinanciamientosService) {}

  @Post()
  create(@Body() dto: CreateFinanciamientoDto) {
    return this.financiamientosService.create(dto);
  }

  @Get()
  findAll() {
    return this.financiamientosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.financiamientosService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateFinanciamientoDto) {
    return this.financiamientosService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.financiamientosService.remove(+id);
  }
}
