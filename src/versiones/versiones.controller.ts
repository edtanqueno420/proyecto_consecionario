import {Controller,Get,Post,Put,Delete,Body,Param,UseGuards,} from '@nestjs/common';
import { VersionesService } from './versiones.service';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Rol } from '../auth/roles.enum';

@Controller('versiones')
export class VersionesController {
  constructor(private readonly versionesService: VersionesService) {}

  @Get()
  findAll() {
    return this.versionesService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @Post()
  create(@Body() dto: CreateVersionDto) {
    return this.versionesService.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateVersionDto) {
    return this.versionesService.update(+id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Rol.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.versionesService.remove(+id);
  }
}
