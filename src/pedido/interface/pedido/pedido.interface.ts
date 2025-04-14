export interface Plato {
    nombre: string;
    cantidad: number;
    precio: number;
  }
  
  export enum EstadoPedido {
    Pendiente = 'pendiente',
    Preparando = 'preparando',
    Listo = 'listo',
    Entregado = 'entregado',
    Cancelado = 'cancelado',
  }
  
  export interface Pedido {
    id: string; 
    cliente: string; 
    platos: Plato[]; 
    total: number; 
    estado: EstadoPedido; 
    fecha: Date; 
    mesa: number; 
  }
  
