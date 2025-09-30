import { Produto } from '../entities/Produto';

export interface IProdutoRepository {
  criar(produto: Produto): Promise<Produto>;
  atualizar(produto: Produto): Promise<Produto>;
  inativar(id: string): Promise<void>;
  listar(): Promise<Produto[]>;
  buscarPorId(id: string): Promise<Produto | null>;
  buscarPorNome(nome: string): Promise<Produto[]>;
}
