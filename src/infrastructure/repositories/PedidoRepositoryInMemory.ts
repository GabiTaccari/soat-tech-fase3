import { Pedido } from '../../domain/entities/Pedido';

export class PedidoRepositoryInMemory {
  private static pedidos: Map<string, Pedido> = new Map();

  static salvar(pedido: Pedido): void {
    this.pedidos.set(pedido.id, pedido);
  }

  static buscarPorId(id: string): Pedido | undefined {
    return this.pedidos.get(id);
  }

  static atualizarStatusPagamento(id: string, status: 'APROVADO' | 'RECUSADO' | 'AGUARDANDO'): void {
    const pedido = this.pedidos.get(id);
    if (pedido) {
      pedido.statusPagamento = status;
    }
  }

  static buscarTodos(): Pedido[] {
    return Array.from(this.pedidos.values());
  }
}
