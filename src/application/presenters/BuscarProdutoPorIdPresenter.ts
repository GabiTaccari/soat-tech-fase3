// src/application/presenters/BuscarProdutoPorIdPresenter.ts
import { Produto } from '../../domain/entities/Produto';

export class BuscarProdutoPorIdPresenter {
  format(produto: Produto) {
    return {
      id: produto.id,
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      imagemUrl: produto.imagemUrl,
      categoriaId: produto.categoriaId,
      status: produto.ativo ? 'Ativo' : 'Inativo',
    };
  }
}
