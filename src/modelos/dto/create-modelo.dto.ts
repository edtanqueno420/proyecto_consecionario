import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateModeloDto {
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  marcaId: number;
}
