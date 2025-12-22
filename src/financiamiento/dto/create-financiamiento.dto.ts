import { IsNumber } from 'class-validator';


export class CreateFinanciamientoDto {
@IsNumber()
ventaId: number;


@IsNumber()
bancoId: number;


@IsNumber()
monto: number;


@IsNumber()
plazoMeses: number;
}