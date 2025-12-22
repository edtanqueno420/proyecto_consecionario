import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateSolicitudDto {
  @IsNumber()
  usuarioId: number;

  @IsString()
  vehiculoActual: string;

  @IsOptional()
  @IsNumber()
  valorEstimado?: number;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
