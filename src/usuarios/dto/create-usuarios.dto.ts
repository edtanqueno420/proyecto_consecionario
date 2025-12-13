import { IsString, IsEmail, IsNotEmpty, IsNumber, MinLength, MaxLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsNumber()
  @IsNotEmpty()
  rol_id: number; // Necesitas un rol creado previamente (ej: id 1 = Cliente)

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsString()
  @MaxLength(15)
  numero_identificacion: string;

  @IsString()
  tipo_identificacion: string; // CEDULA / RUC / PASAPORTE

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string; // Aquí recibes la clave plana, en el service la debes encriptar (simulado por ahora)

  @IsString()
  telefono_celular: string;
}