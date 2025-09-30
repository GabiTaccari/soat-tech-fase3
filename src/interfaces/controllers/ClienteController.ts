import { Request, Response } from 'express';
import { CriarClienteUseCase } from '../../application/usecases/cliente/CriarClienteUseCase';
import { AtualizarClienteUseCase } from '../../application/usecases/cliente/AtualizarClienteUseCase';
import { InativarClienteUseCase } from '../../application/usecases/cliente/InativarClienteUseCase';
import { ListarClientesUseCase } from '../../application/usecases/cliente/ListarClientesUseCase';
import { BuscarClientePorCpfUseCase } from '../../application/usecases/cliente/BuscarClientePorCpfUseCase';
import { PrismaClienteRepository } from '../../infrastructure/database/repositories/PrismaClienteRepository';
import { CriarClientePresenter } from '../../application/presenters/CriarClientePresenter';
import { AtualizarClientePresenter } from '../../application/presenters/AtualizarClientePresenter';
import { BuscarClientePorCpfPresenter } from '../../application/presenters/BuscarClientePorCpfPresenter';
import { InativarClientePresenter } from '../../application/presenters/InativarClientePresenter';
import { ListarClientesPresenter } from '../../application/presenters/ListarClientesPresenter';

const clienteRepository = new PrismaClienteRepository();

export class ClienteController {
  static async criar(req: Request, res: Response) {
    const useCase = new CriarClienteUseCase(clienteRepository);
    const presenter = new CriarClientePresenter();

    try {
      const cliente = await useCase.execute(req.body);
      const clienteResponse = presenter.format(cliente);
      return res.status(201).json(clienteResponse);
    } catch (error: any) {
      console.error(error);
      return res.status(400).json({ erro: error.message || 'Erro ao criar cliente' });
    }
  }

  static async atualizar(req: Request, res: Response) {
    const useCase = new AtualizarClienteUseCase(clienteRepository);
    const presenter = new AtualizarClientePresenter();

    try {
      const cliente = await useCase.execute(req.body);
      const clienteResponse = presenter.format(cliente);
      return res.json(clienteResponse);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao atualizar cliente' });
    }
  }

  static async inativar(req: Request, res: Response) {
    const useCase = new InativarClienteUseCase(clienteRepository);
    const presenter = new InativarClientePresenter();

    try {
      await useCase.execute(req.params.id);
      const response = presenter.format();
      return res.json(response);
    } catch (error: any) {
      console.error(error);
      return res.status(404).json({ erro: error.message || 'Erro ao inativar cliente' });
    }
  }

  static async listar(req: Request, res: Response) {
    const useCase = new ListarClientesUseCase(clienteRepository);
    const presenter = new ListarClientesPresenter();

    try {
      const clientes = await useCase.execute();
      const clientesResponse = presenter.format(clientes);
      return res.json(clientesResponse);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao listar clientes' });
    }
  }

  static async buscarPorCpf(req: Request, res: Response) {
    const useCase = new BuscarClientePorCpfUseCase(clienteRepository);
    const presenter = new BuscarClientePorCpfPresenter();

    try {
      const cliente = await useCase.execute(req.params.cpf);
      const clienteResponse = presenter.format(cliente);
      return res.json(clienteResponse);
    } catch (error: any) {
      console.error(error);
      return res.status(404).json({ erro: error.message || 'Erro ao buscar cliente' });
    }
  }
}
