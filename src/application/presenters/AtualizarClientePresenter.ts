// src/application/presenters/AtualizarClientePresenter.ts
import { Cliente } from '../../domain/entities/Cliente';
import { AtualizarClienteDTO } from '../dtos/AtualizarClienteDTO';

export class AtualizarClientePresenter {
  format(cliente: Cliente): AtualizarClienteDTO {
    return {
      id: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
      cpf: cliente.cpf,
      recebeEmail: cliente.recebeEmail,
    };
  }
}
