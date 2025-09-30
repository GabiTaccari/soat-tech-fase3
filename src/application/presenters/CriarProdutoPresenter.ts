// src/application/presenters/CriarProdutoPresenter.ts
import { Produto } from '../../domain/entities/Produto';
import { CriarProdutoDTO } from '../dtos/CriarProdutoDTO';

export class CriarProdutoPresenter {
  format(produto: Produto): CriarProdutoDTO {
    return {
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      imagemUrl: produto.imagemUrl,
      categoriaId: produto.categoriaId,
    };
  }
}
