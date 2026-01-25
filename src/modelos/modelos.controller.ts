import {Controller,Get,Post,Put,Delete,Body,Param,UseGuards,} from '@nestjs/common';
import { ModelosService } from './modelos.service';
import { CreateModeloDto } from './dto/create-modelo.dto';
import { UpdateModeloDto } from './dto/update-modelo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../auth/roles.enum';

@Controller('modelos')
export class ModelosController {
  constructor(private readonly modelosService: ModelosService) {}

  @Get()
  findAll() {
    return this.modelosService.findAll();
  }

  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles(Rol.ADMIN)
  @Post()
  create(@Body() dto: CreateModeloDto) {
    return this.modelosService.create(dto);
  }

  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles(Rol.ADMIN)
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateModeloDto) {
    return this.modelosService.update(+id, dto);
  }

  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@Roles(Rol.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.modelosService.remove(+id);
  }
}
