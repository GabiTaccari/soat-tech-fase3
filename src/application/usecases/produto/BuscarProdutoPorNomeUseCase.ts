import { IProdutoRepository } from '../../../domain/repositories/IProdutoRepository';
import { Produto } from '../../../domain/entities/Produto';

export class BuscarProdutoPorNomeUseCase {
  constructor(private produtoRepository: IProdutoRepository) {}

  async execute(nome: string): Promise<Produto[]> {
    return this.produtoRepository.buscarPorNome(nome);
  }
}
