import { Controller, Get, Post, Patch, Delete, Param, Body, HttpCode, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PedidosService } from './pedido.service';
import { Pedido, EstadoPedido } from './interface/pedido/pedido.interface';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Get()
  obtenerTodosLosPedidos(): Pedido[] {
    return this.pedidosService.obtenerPedidos();
  }

  @Get(':id')
  obtenerPedidoPorId(@Param('id') id: string): Pedido {
    try {
      return this.pedidosService.obtenerPedidoPorId(id);
    } catch (error) {
      throw new NotFoundException(`Pedido con id ${id} no encontrado.`);
    }
  }

  @Post()
  @HttpCode(201)
  crearNuevoPedido(@Body() pedidoData: Pedido): Pedido {
    try {
      return this.pedidosService.crearPedido(pedidoData);
    } catch (error) {
      throw new BadRequestException('Datos inválidos para crear el pedido.');
    }
  }

  @Patch(':id/estado')
  actualizarEstado(@Param('id') id: string, @Body('estado') estado: EstadoPedido): Pedido {
    if (!Object.values(EstadoPedido).includes(estado)) {
      throw new BadRequestException('Estado de pedido no válido.');
    }
    try {
      return this.pedidosService.cambiarEstadoPedido(id, estado);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(`No se puede cambiar el estado del pedido ${id}.`);
      }
      throw error;
    }
  }

  @Delete(':id')
  cancelarPedido(@Param('id') id: string): Pedido {
    try {
      return this.pedidosService.cancelarPedido(id);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(`No se puede cancelar el pedido ${id}.`);
      }
      throw error;
    }
  }
}