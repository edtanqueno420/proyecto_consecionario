import { IsNumber, IsString } from 'class-validator';

export class CreateTramiteDto {
  @IsNumber()
  ventaId: number;

  @IsString()
  tipoTramite: string;
}
