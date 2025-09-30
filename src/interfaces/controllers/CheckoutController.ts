import { Request, Response } from 'express';
import { CheckoutPedido } from '../../application/usecases/CheckoutPedido';

export class CheckoutController {
  static async handle(req: Request, res: Response) {
    const { produtos, clienteId } = req.body;

    if (!Array.isArray(produtos) || produtos.length === 0) {
      return res.status(400).json({ erro: 'Produtos inválidos' });
    }

    const usecase = new CheckoutPedido();
    const pedidoId = await usecase.execute(produtos, clienteId);

    return res.status(201).json({ pedidoId });
  }
}