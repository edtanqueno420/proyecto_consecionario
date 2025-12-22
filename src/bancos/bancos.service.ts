import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banco } from './banco.entity';
import { CreateBancoDto } from './dto/create-banco.dto';
import { UpdateBancoDto } from './dto/update-banco.dto';

@Injectable()
export class BancosService {
  constructor(
    @InjectRepository(Banco)
    private readonly bancoRepo: Repository<Banco>,
  ) {}

  create(dto: CreateBancoDto) {
    const banco = this.bancoRepo.create(dto);
    return this.bancoRepo.save(banco);
  }

  findAll() {
    return this.bancoRepo.find({ where: { activo: true } });
  }

  async findOne(id: number) {
    const banco = await this.bancoRepo.findOne({ where: { id } });
    if (!banco) {
      throw new NotFoundException('Banco no encontrado');
    }
    return banco;
  }

  async update(id: number, dto: UpdateBancoDto) {
    const banco = await this.findOne(id);
    Object.assign(banco, dto);
    return this.bancoRepo.save(banco);
  }

  async remove(id: number) {
    const banco = await this.findOne(id);
    return this.bancoRepo.remove(banco);
  }
}
