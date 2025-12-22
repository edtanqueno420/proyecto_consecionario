import {Controller,Get,Post,Put,Delete,Body,Param,UseGuards,} from '@nestjs/common';
import { BancosService } from './bancos.service';
import { CreateBancoDto } from './dto/create-banco.dto';
import { UpdateBancoDto } from './dto/update-banco.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../auth/roles.enum';

@Controller('bancos')
export class BancosController {
  constructor(private readonly bancosService: BancosService) {}

  // Crear banco (ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @Post()
  create(@Body() dto: CreateBancoDto) {
    return this.bancosService.create(dto);
  }

  // Listar bancos (público)
  @Get()
  findAll() {
    return this.bancosService.findAll();
  }

  // Obtener banco por id
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bancosService.findOne(+id);
  }

  // Actualizar banco (ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateBancoDto) {
    return this.bancosService.update(+id, dto);
  }

  // Eliminar banco (ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.bancosService.remove(+id);
  }
}
