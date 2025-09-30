import { Request, Response } from 'express';
import { CriarPedidoUseCase } from '../../application/usecases/pedido/CriarPedidoUseCase';
import { ListarPedidosUseCase } from '../../application/usecases/pedido/ListarPedidosUseCase';
import { BuscarPedidoPorIdUseCase } from '../../application/usecases/pedido/BuscarPedidoPorIdUseCase';
import { AtualizarStatusPedidoUseCase } from '../../application/usecases/pedido/AtualizarStatusPedidoUseCase';
import { AtualizarStatusPagamentoUseCase } from '../../application/usecases/pedido/AtualizarStatusPagamentoUseCase';

import { PedidoPrismaRepository } from '../../infrastructure/database/repositories/PedidoPrismaRepository';
import { PrismaClienteRepository } from '../../infrastructure/database/repositories/PrismaClienteRepository';
import { ProdutoPrismaRepository } from '../../infrastructure/database/repositories/ProdutoPrismaRepository';
import { PagamentoPrismaRepository } from '../../infrastructure/database/repositories/PagamentoPrismaRepository';

import { CriarPedidoPresenter } from '../../application/presenters/CriarPedidoPresenter';
import { AtualizarStatusPedidoPresenter } from '../../application/presenters/AtualizarStatusPedidoPresenter';
import { BuscarPedidoPorIdPresenter } from '../../application/presenters/BuscarPedidoPorIdPresenter';
import { ListarPedidosPresenter } from '../../application/presenters/ListarPedidosPresenter';
import { AtualizarStatusPagamentoPresenter } from '../../application/presenters/AtualizarStatusPagamentoPresenter';
import { AtualizarPagamentoUseCase } from '../../application/usecases/pagamento/AtualizarPagamentoUseCase';

const pedidoRepo = new PedidoPrismaRepository();
const clienteRepo = new PrismaClienteRepository();
const produtoRepo = new ProdutoPrismaRepository();
const pagamentoRepo = new PagamentoPrismaRepository();

export class PedidoController {
  static async criar(req: Request, res: Response) {
    try {
      const useCase = new CriarPedidoUseCase(pedidoRepo, clienteRepo, produtoRepo);
      const presenter = new CriarPedidoPresenter();
      const pedido = await useCase.execute(req.body);
      const pedidoResponse = presenter.format(pedido);  // Usando o Presenter para formatar
      return res.status(201).json(pedidoResponse);
    } catch (error: any) {
      console.error(error);
      return res.status(400).json({ erro: error.message || 'Erro ao criar pedido' });
    }
  }

  // static async listar(req: Request, res: Response) {
  //   try {
  //     const useCase = new ListarPedidosUseCase(pedidoRepo);
  //     const presenter = new ListarPedidosPresenter();
  //     const pedidos = await useCase.execute();
  //     const pedidosResponse = presenter.format(pedidos);  
  //     return res.json(pedidosResponse);
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ erro: 'Erro ao listar pedidos' });
  //   }
  // }

  // pedidos.controller.ts (ou onde está esse método)
static async listar(req: Request, res: Response) {
  try {
    const cpf = (req as any).user?.cpf;              // <-- vem do middleware JWT
    if (!cpf) return res.status(401).json({ error: 'missing bearer token' });

    const useCase = new ListarPedidosUseCase(pedidoRepo);
    const pedidos = await useCase.execute({ cpf });   // <-- passe o filtro
    const presenter = new ListarPedidosPresenter();
    return res.json(presenter.format(pedidos));
  } catch (error: any) {
  console.error('Listar pedidos erro:', error?.message, error?.stack || error);
  // return res.status(500).json({ erro: 'Erro ao listar pedidos' });
  return res.status(500).json({
    erro: 'Erro ao listar pedidos',
    detalhe: error?.message,
    stack: error?.stack,   // cuidado, pode ser bem grande
    tipo: error?.name,
  });
}
}


  static async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new BuscarPedidoPorIdUseCase(pedidoRepo);
      const presenter = new BuscarPedidoPorIdPresenter();
      const pedido = await useCase.execute(id);
      if (!pedido) return res.status(404).json({ erro: 'Pedido não encontrado' });
      const pedidoResponse = presenter.format(pedido);  
      return res.json(pedidoResponse);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao buscar pedido' });
    }
  }

  static async atualizarStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ erro: 'Status é obrigatório' });
      }

      const useCase = new AtualizarStatusPedidoUseCase(pedidoRepo);
      const presenter = new AtualizarStatusPedidoPresenter();
      await useCase.execute({ id, status });
      const response = presenter.format();  
      return res.json(response);
    } catch (error: any) {
      console.error(error);
      return res.status(400).json({ erro: error.message });
    }
  }

  static async atualizarPagamento(req: Request, res: Response) {
    try {
      const { id: pedidoId } = req.params;
      const { metodo, status } = req.body;
  
      
      const useCase = new AtualizarPagamentoUseCase(pagamentoRepo, pedidoRepo);
      await useCase.execute({ pedidoId, metodo, status });
  
      return res.json({ mensagem: 'Pagamento atualizado com sucesso.' });
    } catch (error: any) {
      console.error(error);
      return res.status(400).json({ erro: error.message });
    }
  }

  static async consultarStatusPagamento(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new BuscarPedidoPorIdUseCase(pedidoRepo);
      const pedido = await useCase.execute(id);

      if (!pedido) return res.status(404).json({ erro: 'Pedido não encontrado' });

      return res.json({ statusPagamento: pedido.statusPagamento });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao consultar status de pagamento' });
    }
  }
}
