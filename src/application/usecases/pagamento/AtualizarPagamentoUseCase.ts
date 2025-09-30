import { IPagamentoRepository } from '../../../domain/repositories/IPagamentoRepository';
import { IPedidoRepository } from '../../../domain/repositories/IPedidoRepository';
import { AtualizarPagamentoDTO } from '../../dtos/AtualizarPagamentoDTO';
import { StatusPagamento } from '../../../domain/entities/Pedido';

export class AtualizarPagamentoUseCase {
  constructor(
    private pagamentoRepository: IPagamentoRepository,
    private pedidoRepository: IPedidoRepository
  ) {}

  async execute(dto: AtualizarPagamentoDTO): Promise<void> {
    const { pedidoId, metodo, status } = dto;

    if (!pedidoId || !status) {
      throw new Error('Dados obrigatórios ausentes.');
    }

    await this.pagamentoRepository.atualizarStatus({
      pedidoId,
      metodo,
      status: status as StatusPagamento,
    });

    await this.pedidoRepository.atualizarStatusPagamento(pedidoId, status as StatusPagamento);
  }
}
