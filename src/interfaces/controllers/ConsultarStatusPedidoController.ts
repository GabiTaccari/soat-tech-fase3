import { Request, Response } from 'express';
import { PedidoRepositoryInMemory } from '../../infrastructure/repositories/PedidoRepositoryInMemory';

export class ConsultarStatusPedidoController {
  static handle(req: Request, res: Response) {
    const { id } = req.params;

    const pedido = PedidoRepositoryInMemory.buscarPorId(id);

    if (!pedido) {
      return res.status(404).json({ erro: 'Pedido não encontrado' });
    }

    return res.status(200).json({
      statusPedido: pedido.status,
      statusPagamento: pedido.statusPagamento,
    });
  }
}
