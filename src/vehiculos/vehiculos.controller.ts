import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { VehiculosService } from './vehiculos.service';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';

@Controller('vehiculos')
export class VehiculosController {
  constructor(
    private readonly vehiculosService: VehiculosService,
  ) {}

  @Post()
  create(@Body() dto: CreateVehiculoDto) {
    return this.vehiculosService.create(dto);
  }

  @Get()
  findAll() {
    return this.vehiculosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.vehiculosService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateVehiculoDto,
  ) {
    return this.vehiculosService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.vehiculosService.remove(+id);
  }
}
