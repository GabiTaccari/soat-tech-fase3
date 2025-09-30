import { AtualizarPagamentoDTO } from '../../application/dtos/AtualizarPagamentoDTO';
import { StatusPagamento } from '../entities/Pedido';
import { CriarPagamentoDTO } from '../../../application/dtos/CriarPagamentoDTO';

export interface AtualizarStatusPagamentoDTO {
  pedidoId: string;
  metodo?: string;
  status: StatusPagamento;
}


export interface IPagamentoRepository {
  atualizarPagamento(dto: AtualizarPagamentoDTO): Promise<void>;
  criarPagamento(data: CriarPagamentoDTO): Promise<void>;
}
