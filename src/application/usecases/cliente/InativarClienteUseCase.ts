import { IClienteRepository } from '../../../domain/repositories/IClienteRepository';

export class InativarClienteUseCase {
  constructor(private clienteRepository: IClienteRepository) {}

  async execute(id: string): Promise<void> {
    const cliente = await this.clienteRepository.buscarPorId(id);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    await this.clienteRepository.inativar(id);
  }
}
