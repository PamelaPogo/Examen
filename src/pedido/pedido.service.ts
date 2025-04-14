import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { Pedido, EstadoPedido } from './interface/pedido/pedido.interface';

@Injectable()
export class PedidosService {
  private pedidos: Pedido[] = [];
  private idCounter: number = 1;  

  obtenerPedidos(): Pedido[] {
    return this.pedidos;
  }

  obtenerPedidosPorEstado(estado: EstadoPedido): Pedido[] {
    return this.pedidos.filter(pedido => pedido.estado === estado);
  }

  obtenerPedidoPorId(id: string): Pedido {
    const pedido = this.pedidos.find(p => p.id === id);
    if (!pedido) {
      throw new NotFoundException(`No encontramos el pedido con el id ${id}.`);
    }
    return pedido;
  }

  crearPedido(pedidoData: Pedido): Pedido {
    if (!pedidoData.cliente || pedidoData.cliente.length < 3) {
      throw new BadRequestException('El nombre del cliente debe tener al menos 3 caracteres.');}
    if (pedidoData.mesa < 1 || pedidoData.mesa > 20) {
      throw new BadRequestException('La mesa debe estar entre el 1 y el 20.');}

    //id automatico
    pedidoData.id = (this.idCounter++).toString();
    // total
    pedidoData.total = pedidoData.platos.reduce(
      (total, plato) => total + (plato.precio * plato.cantidad), 0);
    // estado
    pedidoData.estado = EstadoPedido.Pendiente;
    this.pedidos.push(pedidoData);
    return pedidoData;
  }

  cambiarEstadoPedido(id: string, estado: EstadoPedido): Pedido {
    const pedido = this.obtenerPedidoPorId(id);
    if (pedido.estado === EstadoPedido.Entregado || pedido.estado === EstadoPedido.Cancelado) {
      throw new ConflictException(`No se puede cambiar el estado de un pedido que está en estado ${pedido.estado}.`);}
    pedido.estado = estado;
    return pedido;
  }

  cancelarPedido(id: string): Pedido {
    const pedido = this.obtenerPedidoPorId(id);
    if (pedido.estado === EstadoPedido.Entregado || pedido.estado === EstadoPedido.Cancelado) {
      throw new ConflictException(`No se puede cancelar un pedido que está en estado ${pedido.estado}.`);
    }
    pedido.estado = EstadoPedido.Cancelado;
    return pedido;
  }
}
