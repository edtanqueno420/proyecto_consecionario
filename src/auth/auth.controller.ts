import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    // 1. Validar credenciales
    const user = await this.authService.validateUser(body.email, body.password);
    
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas'); // <--- Esto cumple el criterio Negativo (401)
    }

    // 2. Si todo bien, devolver token
    return this.authService.login(user);
  }
}