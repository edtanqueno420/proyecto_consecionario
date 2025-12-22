import { IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class CreateBancoDto {
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  tasa_interes_anual: number;

  @IsNumber()
  plazo_maximo_meses: number;

  @IsBoolean()
  activo?: boolean;
}
