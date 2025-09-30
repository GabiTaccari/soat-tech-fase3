import { IClienteRepository } from '../../../domain/repositories/IClienteRepository';
import { Cliente } from '../../../domain/entities/Cliente';

export class BuscarClientePorCpfUseCase {
  constructor(private clienteRepository: IClienteRepository) {}

  async execute(cpf: string): Promise<Cliente> {
    const cliente = await this.clienteRepository.buscarPorCpf(cpf);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }
    return cliente;
  }
}
