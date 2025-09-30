import { IProdutoRepository } from '../../../domain/repositories/IProdutoRepository';

export class InativarProdutoUseCase {
  constructor(private produtoRepository: IProdutoRepository) {}

  async execute(id: string): Promise<void> {
    const existente = await this.produtoRepository.buscarPorId(id);
    if (!existente) {
      throw new Error('Produto não encontrado');
    }

    await this.produtoRepository.inativar(id);
  }
}
