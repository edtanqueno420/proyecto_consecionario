import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSaleDto {
  @IsNumber() // <--- CAMBIO IMPORTANTE: Antes era IsUUID
  @IsNotEmpty()
  usuario_id: number;

  @IsNumber()
  @IsNotEmpty()
  vehiculo_id: number;
}