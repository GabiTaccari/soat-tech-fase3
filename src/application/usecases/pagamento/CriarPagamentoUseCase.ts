import { IPagamentoRepository } from '../../../domain/repositories/IPagamentoRepository';
import { CriarPagamentoDTO } from '../../dtos/CriarPagamentoDTO';

export class CriarPagamentoUseCase {
  constructor(private pagamentoRepository: IPagamentoRepository) {}

  async execute(dto: CriarPagamentoDTO): Promise<void> {
    if (!dto.pedidoId || !dto.valor || !dto.metodo) {
      throw new Error('Dados obrigatórios faltando');
    }

    await this.pagamentoRepository.criarPagamento(dto);
  }
}
