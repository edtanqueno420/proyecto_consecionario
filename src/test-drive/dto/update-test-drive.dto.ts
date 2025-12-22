import { IsEnum } from 'class-validator';
import { EstadoTestDrive } from '../test-drive.entity';

export class UpdateTestDriveDto {
  @IsEnum(EstadoTestDrive)
  estado: EstadoTestDrive;
}
