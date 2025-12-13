import { Module } from '@nestjs/common';
import { TestDriveController } from './test-drive.controller';
import { TestDriveService } from './test-drive.service';

@Module({
  controllers: [TestDriveController],
  providers: [TestDriveService]
})
export class TestDriveModule {}
