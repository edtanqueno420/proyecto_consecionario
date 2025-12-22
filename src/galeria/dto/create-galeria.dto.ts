import { IsArray, ValidateNested, IsString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

class ImagenDto {
  @IsString()
  url: string;

  @IsBoolean()   // ✅ Aquí validamos que sea booleano
  principal: boolean;
}

export class CreateGaleriaDto {
  @IsString() 
  vehiculo: string;  // _id del vehículo como string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImagenDto)
  imagenes: ImagenDto[];
}
