import { Produto } from '../../../domain/entities/Produto';
import { IProdutoRepository } from '../../../domain/repositories/IProdutoRepository';

export class ListarProdutosUseCase {
  constructor(private produtoRepository: IProdutoRepository) {}

  async execute(): Promise<Produto[]> {
    return this.produtoRepository.listar();
  }
}
