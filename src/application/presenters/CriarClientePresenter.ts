// src/application/presenters/CriarClientePresenter.ts
import { Cliente } from '../../domain/entities/Cliente';
import { CriarClienteDTO } from '../dtos/CriarClienteDTO';

export class CriarClientePresenter {
  format(cliente: Cliente): CriarClienteDTO {
    return {
      id: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
      cpf: cliente.cpf,
      recebeEmail: cliente.recebeEmail,
    };
  }
}
