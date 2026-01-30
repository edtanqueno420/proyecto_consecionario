import { IsNotEmpty, IsDateString, IsNumber, IsString, IsEmail } from 'class-validator';

export class CreateTestDriveDto {
  @IsNumber()
  vehiculoId: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsDateString()
  fecha: string;

  @IsString()
  @IsNotEmpty()
  hora: string;
}
