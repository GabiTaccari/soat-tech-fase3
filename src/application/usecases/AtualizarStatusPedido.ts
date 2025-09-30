import { PedidoRepositoryInMemory } from '../../infrastructure/repositories/PedidoRepositoryInMemory';
import { StatusPedido } from '../../domain/entities/Pedido';

export class AtualizarStatusPedido {
  execute(id: string, novoStatus: StatusPedido): void {
    const pedido = PedidoRepositoryInMemory.buscarPorId(id);

    if (!pedido) {
      throw new Error('Pedido não encontrado');
    }

    const statusPermitidos: StatusPedido[] = ['RECEBIDO', 'EM_PREPARACAO', 'PRONTO', 'FINALIZADO'];
    if (!statusPermitidos.includes(novoStatus)) {
      throw new Error('Status inválido');
    }

    pedido.status = novoStatus;
  }
}
