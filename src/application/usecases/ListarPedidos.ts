import { Pedido } from '../../domain/entities/Pedido';
import { PedidoRepositoryInMemory } from '../../infrastructure/repositories/PedidoRepositoryInMemory';

export class ListarPedidos {
  execute(): Pedido[] {
    const todos = PedidoRepositoryInMemory.buscarTodos();

    const pedidosVisiveis = todos.filter(p =>
      p.status !== 'FINALIZADO'
    );

    const ordemStatus: Record<string, number> = {
      PRONTO: 1,
      EM_PREPARACAO: 2,
      RECEBIDO: 3,
    };

    return pedidosVisiveis.sort((a, b) => {
      const pesoStatusA = ordemStatus[a.status];
      const pesoStatusB = ordemStatus[b.status];

      if (pesoStatusA !== pesoStatusB) {
        return pesoStatusA - pesoStatusB;
      }

      return a.dataCriacao.getTime() - b.dataCriacao.getTime();
    });
  }
}
