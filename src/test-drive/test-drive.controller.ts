import {Controller,Post,Body,Req,UseGuards,Get,Put,Param,} from '@nestjs/common';
import { TestDriveService } from './test-drive.service';
import { CreateTestDriveDto } from './dto/create-test-drive.dto';
import { UpdateTestDriveDto } from './dto/update-test-drive.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('test-drive')
export class TestDriveController {
  constructor(private readonly testDriveService: TestDriveService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateTestDriveDto, @Req() req) {
    return this.testDriveService.create(dto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.testDriveService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateTestDriveDto) {
    return this.testDriveService.update(+id, dto);
  }
}
