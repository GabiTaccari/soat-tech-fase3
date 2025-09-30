import { Request, Response } from 'express';
import { CriarProdutoUseCase } from '../../application/usecases/produto/CriarProdutoUseCase';
import { AtualizarProdutoUseCase } from '../../application/usecases/produto/AtualizarProdutoUseCase';
import { InativarProdutoUseCase } from '../../application/usecases/produto/InativarProdutoUseCase';
import { ListarProdutosUseCase } from '../../application/usecases/produto/ListarProdutosUseCase';
import { BuscarProdutoPorIdUseCase } from '../../application/usecases/produto/BuscarProdutoPorIdUseCase';
import { ProdutoPrismaRepository } from '../../infrastructure/database/repositories/ProdutoPrismaRepository';
import { BuscarProdutoPorNomeUseCase } from '../../application/usecases/produto/BuscarProdutoPorNomeUseCase';
import { CriarProdutoPresenter } from '../../application/presenters/CriarProdutoPresenter';
import { AtualizarProdutoPresenter } from '../../application/presenters/AtualizarProdutoPresenter';
import { BuscarProdutoPorIdPresenter } from '../../application/presenters/BuscarProdutoPorIdPresenter';
import { InativarProdutoPresenter } from '../../application/presenters/InativarProdutoPresenter';
import { ListarProdutosPresenter } from '../../application/presenters/ListarProdutosPresenter';

const produtoRepository = new ProdutoPrismaRepository();

export class ProdutoController {
  static async criar(req: Request, res: Response) {
    try {
      const { nome, descricao, preco, imagemUrl, categoriaId } = req.body;
      const useCase = new CriarProdutoUseCase(produtoRepository);
      const presenter = new CriarProdutoPresenter();
      const produto = await useCase.execute({ nome, descricao, preco, imagemUrl, categoriaId });
      const produtoResponse = presenter.format(produto);
      return res.status(201).json(produtoResponse);
    } catch (error: any) {
      console.error(error);
      return res.status(400).json({ erro: error.message || 'Erro ao cadastrar produto' });
    }
  }

  static async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, descricao, preco, imagemUrl, categoriaId } = req.body;
      const useCase = new AtualizarProdutoUseCase(produtoRepository);
      const presenter = new AtualizarProdutoPresenter();
      const produto = await useCase.execute({ id, nome, descricao, preco, imagemUrl, categoriaId });
      const produtoResponse = presenter.format(produto);
      return res.json(produtoResponse);
    } catch (error: any) {
      console.error(error);
      return res.status(400).json({ erro: error.message || 'Erro ao atualizar produto' });
    }
  }

  static async inativar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new InativarProdutoUseCase(produtoRepository);
      const presenter = new InativarProdutoPresenter();
      await useCase.execute(id);
      const response = presenter.format();
      return res.json(response);
    } catch (error: any) {
      console.error(error);
      return res.status(400).json({ erro: error.message || 'Erro ao inativar produto' });
    }
  }

  static async listar(req: Request, res: Response) {
    try {
      const useCase = new ListarProdutosUseCase(produtoRepository);
      const presenter = new ListarProdutosPresenter();
      const produtos = await useCase.execute();
      const produtosResponse = presenter.format(produtos);
      return res.json(produtosResponse);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao listar produtos' });
    }
  }

  static async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const useCase = new BuscarProdutoPorIdUseCase(produtoRepository);
      const presenter = new BuscarProdutoPorIdPresenter();
      const produto = await useCase.execute(id);
      const produtoResponse = presenter.format(produto);
      return res.json(produtoResponse);
    } catch (error: any) {
      console.error(error);
      return res.status(404).json({ erro: error.message || 'Produto não encontrado' });
    }
  }

  static async buscarPorNome(req: Request, res: Response) {
    try {
      const { nome } = req.query;
      if (!nome || typeof nome !== 'string') {
        return res.status(400).json({ erro: 'Parâmetro "nome" é obrigatório' });
      }
      const useCase = new BuscarProdutoPorNomeUseCase(produtoRepository);
      const presenter = new ListarProdutosPresenter();
      const produtos = await useCase.execute(nome);
      const produtosResponse = presenter.format(produtos);
      return res.json(produtosResponse);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao buscar produtos por nome' });
    }
  }
}
