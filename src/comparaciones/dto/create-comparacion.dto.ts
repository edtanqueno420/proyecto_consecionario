import { IsArray, ArrayMaxSize, IsNumber } from 'class-validator';

export class CreateComparacionDto {
  @IsNumber()
  usuarioId: number;

  @IsArray()
  @ArrayMaxSize(3)
  vehiculosIds: number[];
}
