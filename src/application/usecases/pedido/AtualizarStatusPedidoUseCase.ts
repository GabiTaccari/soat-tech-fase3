import { IPedidoRepository } from '../../../domain/repositories/IPedidoRepository';
import { AtualizarStatusPedidoDTO } from '../../dtos/AtualizarStatusPedidoDTO';
import { StatusPedidoEnum } from '../../../domain/entities/Pedido';

export class AtualizarStatusPedidoUseCase {
  constructor(private pedidoRepository: IPedidoRepository) {}

  async execute(dto: AtualizarStatusPedidoDTO): Promise<void> {
    const { id, status } = dto;

    if (!Object.values(StatusPedidoEnum).includes(status as StatusPedidoEnum)) {
      throw new Error('Status de pedido inválido.');
    }

    await this.pedidoRepository.atualizarStatus(id, status as StatusPedidoEnum);
  }
}
