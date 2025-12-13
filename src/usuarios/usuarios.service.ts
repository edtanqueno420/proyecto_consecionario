import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuarios.entity';
import { CreateUsuarioDto } from './dto/create-usuarios.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  async create(data: CreateUsuarioDto) {
    // Nota: Aquí deberías hashear el password con bcrypt, 
    // pero para tu Sprint 1 lo guardaremos directo en password_hash
    const nuevoUsuario = this.usuarioRepo.create({
      ...data,
      password_hash: data.password, // TODO: Implementar hash real luego
      rol: { id: data.rol_id }
    });
    
    return await this.usuarioRepo.save(nuevoUsuario);
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepo.findOne({
      where: { id },
      relations: ['rol']
    });
    if (!usuario) throw new NotFoundException(`Usuario con ID ${id} no existe`);
    return usuario;
  }
  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepo.findOne({ 
      where: { email },
      relations: ['rol'] // Traemos el rol para meterlo al token
    });
  }
  
}