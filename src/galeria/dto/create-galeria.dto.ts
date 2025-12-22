import {
  IsNumber,
  IsArray,
  ValidateNested,
  IsBoolean,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

class ImagenDto {
  @IsString()
  url: string;

  @IsBoolean()
  principal: boolean;
}

export class CreateGaleriaDto {
  @IsNumber()
  vehiculoId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ImagenDto)
  imagenes: ImagenDto[];
}
