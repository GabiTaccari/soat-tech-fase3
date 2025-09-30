import { IPedidoRepository } from '../../../domain/repositories/IPedidoRepository';
import { Pedido } from '../../../domain/entities/Pedido';

export class BuscarPedidoPorIdUseCase {
  constructor(private pedidoRepository: IPedidoRepository) {}

  async execute(id: string): Promise<Pedido> {
    const pedido = await this.pedidoRepository.buscarPorId(id);

    if (!pedido) {
      throw new Error('Pedido não encontrado');
    }

    return pedido;
  }
}
