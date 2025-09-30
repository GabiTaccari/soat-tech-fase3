import { Request, Response } from 'express';
import { ConsultarStatusPagamentoPedido } from '../../application/usecases/ConsultarStatusPagamentoPedido';

export class ConsultarStatusPagamentoController {
  static handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const usecase = new ConsultarStatusPagamentoPedido();
      const status = usecase.execute(id);
      return res.json({ status });
    } catch (error: any) {
      return res.status(404).json({ erro: error.message });
    }
  }
}
