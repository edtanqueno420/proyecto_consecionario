import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Venta } from './ventas.entity';
import { CreateSaleDto } from './dto/create-ventas.dto'; // Asegúrate que este DTO exista
import { Vehiculo } from '../vehiculos/vehiculos.entity'; // Revisa la ruta
import { EstadoVehiculo } from '../vehiculos/dto/create-vehiculo.dto'; // Revisa la ruta
import { Usuario } from '../usuarios/usuarios.entity'; // Revisa la ruta

@Injectable()
export class VentasService { // <--- AQUÍ ESTABA EL ERROR (Antes era SalesService)
  constructor(
    @InjectRepository(Venta)
    private ventaRepo: Repository<Venta>,
    private dataSource: DataSource,
  ) {}

  async create(createSaleDto: CreateSaleDto) {
    const { vehiculo_id, usuario_id } = createSaleDto;

    return this.dataSource.manager.transaction(async (manager) => {
      
      // 1. Buscar Vehículo
      const vehiculo = await manager.findOne(Vehiculo, { 
        where: { id: vehiculo_id } 
      });

      if (!vehiculo) throw new NotFoundException(`Vehículo no encontrado`);

      // 2. VALIDACIÓN CRÍTICA (Prueba Negativa)
      if (vehiculo.estado !== EstadoVehiculo.DISPONIBLE) {
        throw new ConflictException(
          `¡Error! El vehículo ya se encuentra ${vehiculo.estado}.`
        );
      }

      // 3. Buscar Usuario
      const usuario = await manager.findOne(Usuario, { 
        where: { id: usuario_id } 
      });
      
      if (!usuario) throw new NotFoundException(`Usuario ID ${usuario_id} no encontrado`);

      // 4. Crear la Venta
      const nuevaVenta = manager.create(Venta, {
        usuario: usuario,
        vehiculo: vehiculo,
        precio_final: vehiculo.precio_venta,
        metodo_pago: 'TRANSFERENCIA',
      });

      // 5. Actualizar vehículo
      vehiculo.estado = EstadoVehiculo.VENDIDO;
      
      await manager.save(vehiculo);
      const ventaGuardada = await manager.save(nuevaVenta);

      return {
        message: 'Venta exitosa',
        folio: ventaGuardada.id,
        comprador: `${usuario.nombre} ${usuario.apellido}`
      };
    });
  }
}