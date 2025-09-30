// src/application/presenters/BuscarClientePorCpfPresenter.ts
import { Cliente } from '../../domain/entities/Cliente';

export class BuscarClientePorCpfPresenter {
  format(cliente: Cliente) {
    return {
      id: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
      cpf: cliente.cpf,
      recebeEmail: cliente.recebeEmail,
      status: cliente.ativo ? 'Ativo' : 'Inativo',
    };
  }
}
