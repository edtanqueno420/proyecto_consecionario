import {
  IsArray,
  ArrayMinSize,
  ValidateNested,
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsUrl,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class ImagenDto {
  @IsString()
  @IsNotEmpty()
  @IsUrl({}, { message: 'url debe ser una URL válida' })
  url: string;

  @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  principal: boolean;
}

export class CreateGaleriaDto {
  @IsString()
  @IsNotEmpty()
  vehiculoId: string; // ID del vehículo en Postgres (en tu caso, number pero lo guardamos como string)

  @IsArray()
  @ArrayMinSize(1, { message: 'imagenes debe tener al menos 1 elemento' })
  @ValidateNested({ each: true })
  @Type(() => ImagenDto)
  imagenes: ImagenDto[];
}
