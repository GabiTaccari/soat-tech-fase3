// src/application/presenters/ListarProdutosPresenter.ts
import { Produto } from '../../domain/entities/Produto';

export class ListarProdutosPresenter {
  format(produtos: Produto[]) {
    return produtos.map(produto => ({
      id: produto.id,
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      imagemUrl: produto.imagemUrl,
      categoriaId: produto.categoriaId,
      status: produto.ativo ? 'Ativo' : 'Inativo',
    }));
  }
}
