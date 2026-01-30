import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TestDriveService } from './test-drive.service';
import { CreateTestDriveDto } from './dto/create-test-drive.dto';

@Controller('test-drive')
export class TestDriveController {
  constructor(private readonly testDriveService: TestDriveService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateTestDriveDto) {
    return this.testDriveService.create(dto);
  }
}
