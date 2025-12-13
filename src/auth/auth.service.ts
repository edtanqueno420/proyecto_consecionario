import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'; // Usamos esto si encriptaste claves, o comparación simple si no.

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    // 1. Buscamos el usuario por email (Necesitas agregar este método en UsuariosService, abajo te digo cómo)
    const user = await this.usuariosService.findByEmail(email);

    // 2. Si el usuario existe y la contraseña coincide
    // NOTA: Si guardaste la contraseña plana (sin encriptar), usa: if (user && user.password_hash === pass)
    // Si la encriptaste, usa: if (user && await bcrypt.compare(pass, user.password_hash))
    
    if (user && user.password_hash === pass) { // <--- Modo simple para tu tarea (Texto plano)
      const { password_hash, ...result } = user;
      return result;
    }
    
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id, role: user.rol?.nombre };
    return {
      access_token: this.jwtService.sign(payload), // <--- Aquí se genera el Token
    };
  }
}