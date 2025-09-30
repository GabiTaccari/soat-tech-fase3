import { Produto } from '../../../domain/entities/Produto';
import { IProdutoRepository } from '../../../domain/repositories/IProdutoRepository';

export class BuscarProdutoPorIdUseCase {
  constructor(private produtoRepository: IProdutoRepository) {}

  async execute(id: string): Promise<Produto> {
    const produto = await this.produtoRepository.buscarPorId(id);
    if (!produto) {
      throw new Error('Produto não encontrado');
    }
    return produto;
  }
}
