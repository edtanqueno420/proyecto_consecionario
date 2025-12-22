import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateVersionDto {
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  anio: number;

  @IsNotEmpty()
  motor: string;

  @IsNotEmpty()
  transmision: string;

  @IsNotEmpty()
  combustible: string;

  @IsNumber()
  precio: number;

  @IsNumber()
  modeloId: number;
}
