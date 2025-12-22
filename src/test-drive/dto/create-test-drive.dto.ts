import { IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateTestDriveDto {
  @IsNumber()
  vehiculoId: number;

  @IsDateString()
  fecha: string;
}
