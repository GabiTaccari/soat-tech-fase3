import { Cliente } from '../entities/Cliente';


export interface IClienteRepository {
  criar(cliente: Omit<Cliente, 'id'>): Promise<Cliente>;
  atualizar(id: string, cliente: Partial<Cliente>): Promise<Cliente>;
  inativar(id: string): Promise<Cliente>;
  listar(): Promise<Cliente[]>;
  buscarPorId(id: string): Promise<Cliente | null>;
  buscarPorCpf(cpf: string): Promise<Cliente | null>;
}
