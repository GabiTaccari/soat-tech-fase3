import { Request, Response } from 'express';
import { ListarCategoriasUseCase } from '../../application/usecases/categoria/ListarCategoriasUseCase';
import { PrismaCategoriaRepository } from '../../infrastructure/database/repositories/PrismaCategoriaRepository';

const categoriaRepository = new PrismaCategoriaRepository();

export class CategoriaController {
  static async listar(req: Request, res: Response) {
    try {
      const useCase = new ListarCategoriasUseCase(categoriaRepository);
      const categorias = await useCase.execute();
      return res.json(categorias);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao listar categorias' });
    }
  }
}
