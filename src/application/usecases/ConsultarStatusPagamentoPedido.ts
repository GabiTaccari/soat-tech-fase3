import { PedidoRepositoryInMemory } from '../../infrastructure/repositories/PedidoRepositoryInMemory';

export class ConsultarStatusPagamentoPedido {
  execute(pedidoId: string): string {
    const pedido = PedidoRepositoryInMemory.buscarPorId(pedidoId);

    if (!pedido) {
      throw new Error('Pedido não encontrado');
    }

    return pedido.statusPagamento;
  }
}
