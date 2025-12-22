import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { EstadoVehiculo } from '../vehiculo.entity';

export class CreateVehiculoDto {
  @IsNotEmpty()
  vin: string;

  @IsNotEmpty()
  color: string;

  @IsNumber()
  precio_final: number;

  @IsNumber()
  versionId: number;

  
}
