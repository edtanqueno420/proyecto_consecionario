import { IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { Rol } from '../../auth/roles.enum';

export class CreateUsuarioDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  apellido: string;

  @IsEnum(Rol)
  rol: Rol;
}
