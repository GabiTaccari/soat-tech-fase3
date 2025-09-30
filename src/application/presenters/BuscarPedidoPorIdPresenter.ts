// src/application/presenters/BuscarPedidoPorIdPresenter.ts
import { Pedido } from '../../domain/entities/Pedido';

export class BuscarPedidoPorIdPresenter {
  format(pedido: Pedido) {
    return {
      id: pedido.id,
      produtos: pedido.produtos,
      clienteId: pedido.clienteId,
      statusPedido: pedido.statusPedido,
      statusPagamento: pedido.statusPagamento,
    };
  }
}
