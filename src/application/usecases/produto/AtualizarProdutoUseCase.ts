import { Produto } from '../../../domain/entities/Produto';
import { IProdutoRepository } from '../../../domain/repositories/IProdutoRepository';
import { AtualizarProdutoDTO } from '../../dtos/AtualizarProdutoDTO';

export class AtualizarProdutoUseCase {
  constructor(private produtoRepository: IProdutoRepository) {}

  async execute(data: AtualizarProdutoDTO): Promise<Produto> {
    const existente = await this.produtoRepository.buscarPorId(data.id);
    if (!existente) {
      throw new Error('Produto não encontrado');
    }

    const atualizado = new Produto(
      existente.id,
      data.nome ?? existente.nome,
      data.descricao ?? existente.descricao,
      data.preco ?? existente.preco,
      data.imagemUrl ?? existente.imagemUrl,
      data.categoriaId ?? existente.categoriaId,
      existente.ativo,
      existente.criadoEm
    );

    return this.produtoRepository.atualizar(atualizado);
  }
}
