import { IsNotEmpty } from 'class-validator';

export class CreateMarcaDto {
  @IsNotEmpty()
  nombre: string;
}
