import {Controller,Post,Get,Delete,Body,Param,Req,UseGuards,} from '@nestjs/common';
import { ComparacionesService } from './comparaciones.service';
import { CreateComparacionDto } from './dto/create-comparacion.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../auth/roles.enum';

@Controller('comparaciones')
@UseGuards(JwtAuthGuard)
export class ComparacionesController {
  constructor(
    private readonly comparacionesService: ComparacionesService,
  ) {}

  @Post()
  create(@Body() dto: CreateComparacionDto, @Req() req) {
    return this.comparacionesService.create(dto, req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @Req() req) {
    return this.comparacionesService.findOne(+id, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Req() req) {
    return this.comparacionesService.remove(+id, req.user.id);
  }
}
