import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PedidosController } from './pedido/pedido.controller';
import { PedidosService } from './pedido/pedido.service';

@Module({
  imports: [],
  controllers: [AppController, PedidosController],
  providers: [AppService, PedidosService],
})
export class AppModule {}
