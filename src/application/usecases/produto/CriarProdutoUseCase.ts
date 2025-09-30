import { Produto } from '../../../domain/entities/Produto';
import { IProdutoRepository } from '../../../domain/repositories/IProdutoRepository';
import { v4 as uuidv4 } from 'uuid';
import { CriarProdutoDTO } from '../../dtos/CriarProdutoDTO';

export class CriarProdutoUseCase {
  constructor(private produtoRepository: IProdutoRepository) {}

  async execute(data: CriarProdutoDTO): Promise<Produto> {
    const produto = new Produto(
      uuidv4(),
      data.nome,
      data.descricao,
      data.preco,
      data.imagemUrl,
      data.categoriaId,
      true // ativo
    );

    return this.produtoRepository.criar(produto);
  }
}
