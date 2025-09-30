import { Pedido } from '../entities/Pedido';
import { AtualizarPedidoDTO } from "../dto/AtualizarPedidoDTO";

export interface IPedidoRepository {
  criar(pedido: Pedido): Promise<Pedido>;
//   atualizar(pedido: Pedido): Promise<Pedido>;
  atualizar(id: string, data: AtualizarPedidoDTO): Promise<void>;
  buscarPorId(id: string): Promise<Pedido | null>;
  listar(): Promise<Pedido[]>;
  atualizarStatus(id: string, status: string): Promise<void>;
  atualizarStatusPagamento(id: string, status: StatusPagamento): Promise<void>;
  listarPorCpf(cpf: string): Promise<Pedido[]>;
}
