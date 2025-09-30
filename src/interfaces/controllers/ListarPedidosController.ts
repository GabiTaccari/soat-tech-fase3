import { Request, Response } from 'express';
import { ListarPedidos } from '../../application/usecases/ListarPedidos';

export class ListarPedidosController {
  static handle(req: Request, res: Response) {
    const usecase = new ListarPedidos();
    const pedidos = usecase.execute();

    return res.status(200).json(pedidos);
  }
}
