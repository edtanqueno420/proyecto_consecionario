import { IsNumber, IsString } from 'class-validator';

export class CreateTramiteProgresoDto {
  @IsNumber()
  tramiteId: number;

  @IsString()
  descripcion: string;

  @IsString()
  estado: string;
}
