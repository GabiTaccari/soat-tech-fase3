import { IClienteRepository } from '../../../domain/repositories/IClienteRepository';
import { Cliente } from '../../../domain/entities/Cliente';

export class ListarClientesUseCase {
  constructor(private clienteRepository: IClienteRepository) {}

  async execute(): Promise<Cliente[]> {
    return this.clienteRepository.listar();
  }
}
