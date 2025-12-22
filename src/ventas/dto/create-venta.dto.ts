import { IsNumber, IsString } from 'class-validator';


export class CreateVentaDto {
@IsNumber()
usuarioId: number;


@IsNumber()
vehiculoId: number;


@IsNumber()
precioFinal: number;


@IsString()
tipoCompra: string;
}