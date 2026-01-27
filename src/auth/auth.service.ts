import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../usuarios/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { Rol } from '../auth/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Usuario)
    private readonly usuarioRepo: Repository<Usuario>,
  ) {}

  // 🔐 LOGIN
  async validateUserAndLogin(email: string, password: string) {
  const usuario = await this.usuarioRepo.findOne({
    where: { email: email.toLowerCase().trim() },
  });

  if (!usuario) {
    throw new UnauthorizedException('Credenciales incorrectas');
  }

  const passwordValido = await bcrypt.compare(
    password,
    usuario.password,
  );

  if (!passwordValido) {
    throw new UnauthorizedException('Credenciales incorrectas');
  }

  return this.login(usuario);
}


  // 🔑 GENERAR JWT
  async login(usuario: Usuario) {
    const payload = {
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        rol: usuario.rol,
      },
    };
  }

  // 📝 REGISTRO (SIGNUP)
  async register(dto: RegisterDto) {
    const email = dto.email.toLowerCase().trim();

    const existe = await this.usuarioRepo.findOne({
      where: { email },
    });

    if (existe) {
      throw new BadRequestException('El email ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const usuario = this.usuarioRepo.create({
      email,
      password: hashedPassword,
      nombre: dto.nombre,
      apellido: dto.apellido,
      rol: Rol.CLIENTE,
    });

    await this.usuarioRepo.save(usuario);

    return this.login(usuario);
  }
}