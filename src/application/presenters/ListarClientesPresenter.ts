// src/application/presenters/ListarClientesPresenter.ts
import { Cliente } from '../../domain/entities/Cliente';

export class ListarClientesPresenter {
  format(clientes: Cliente[]) {
    return clientes.map(cliente => ({
      id: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
      cpf: cliente.cpf,
      recebeEmail: cliente.recebeEmail,
      status: cliente.ativo ? 'Ativo' : 'Inativo',
    }));
  }
}
