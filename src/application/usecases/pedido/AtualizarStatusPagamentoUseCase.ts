import { IPedidoRepository } from '../../../domain/repositories/IPedidoRepository';
import { StatusPagamento } from '../../../domain/entities/Pedido';

export class AtualizarStatusPagamentoUseCase {
  constructor(private pedidoRepository: IPedidoRepository) {}

  async execute(id: string, statusPagamento: StatusPagamento): Promise<void> {
    await this.pedidoRepository.atualizarStatusPagamento(id, statusPagamento);
  }
}
