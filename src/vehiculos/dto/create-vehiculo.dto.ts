
import { IsString, IsNumber, IsNotEmpty, IsEnum, IsOptional, Min, Length, Matches } from 'class-validator';

export enum EstadoVehiculo {
  DISPONIBLE = 'DISPONIBLE',
  RESERVADO = 'RESERVADO',
  VENDIDO = 'VENDIDO',
  MANTENIMIENTO = 'MANTENIMIENTO'
}

export class CreateVehiculoDto {
  @IsNumber()
  @IsNotEmpty()
  version_id: number;

  @IsNumber()
  @IsNotEmpty()
  sucursal_id: number;

  @IsString()
  @Length(17, 17, { message: 'El VIN debe tener exactamente 17 caracteres' })
  vin_chasis: string;

  @IsString()
  @Length(7, 8, { message: 'La placa debe tener entre 7 y 8 caracteres (Ej: PAB-1234)' })
  @Matches(/^[A-Z]{3}-\d{3,4}$/, { message: 'Formato de placa inválido. Use AAA-1234' })
  placa: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsNumber()
  @Min(0)
  kilometraje: number;

  @IsString()
  condicion: string; // Nuevo / Usado

  @IsNumber()
  @Min(0)
  precio_venta: number;

  @IsNumber()
  @IsOptional()
  valor_matricula_aprox?: number;

  @IsEnum(EstadoVehiculo, { message: 'El estado debe ser DISPONIBLE, RESERVADO o VENDIDO' })
  estado: EstadoVehiculo;

  @IsString() // Se recibe como string ISO desde el front
  fecha_ingreso: string;
}