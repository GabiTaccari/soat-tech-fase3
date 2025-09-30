// src/application/presenters/CriarPedidoPresenter.ts
import { Pedido } from '../../domain/entities/Pedido';
import { CriarPedidoDTO } from '../dtos/CriarPedidoDTO';

export class CriarPedidoPresenter {
  format(pedido: Pedido): CriarPedidoDTO {
    return {
      produtos: pedido.produtos.map(produto => ({
        id: produto.id,
        quantidade: produto.quantidade,
      })),
      clienteId: pedido.clienteId,
    };
  }
}
