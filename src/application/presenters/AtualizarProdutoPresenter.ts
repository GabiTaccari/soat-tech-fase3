// src/application/presenters/AtualizarProdutoPresenter.ts
import { Produto } from '../../domain/entities/Produto';
import { AtualizarProdutoDTO } from '../dtos/AtualizarProdutoDTO';

export class AtualizarProdutoPresenter {
  format(produto: Produto): AtualizarProdutoDTO {
    return {
      id: produto.id,
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      imagemUrl: produto.imagemUrl,
      categoriaId: produto.categoriaId,
    };
  }
}
