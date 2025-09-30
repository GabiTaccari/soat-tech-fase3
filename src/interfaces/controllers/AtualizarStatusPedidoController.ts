import { Request, Response } from 'express';
import { AtualizarStatusPedido } from '../../application/usecases/AtualizarStatusPedido';

export class AtualizarStatusPedidoController {
  static handle(req: Request, res: Response) {
    const { id } = req.params;
    const { novoStatus } = req.body;

    if (!novoStatus) {
      return res.status(400).json({ erro: 'novoStatus é obrigatório' });
    }

    try {
      const usecase = new AtualizarStatusPedido();
      usecase.execute(id, novoStatus);
      return res.status(200).json({ mensagem: `Status atualizado para ${novoStatus}` });
    } catch (error: any) {
      return res.status(400).json({ erro: error.message });
    }
  }
}
