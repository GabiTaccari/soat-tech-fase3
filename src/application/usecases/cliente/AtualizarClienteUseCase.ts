import { IClienteRepository } from '../../../domain/repositories/IClienteRepository';
import { Cliente } from '../../../domain/entities/Cliente';
import { AtualizarClienteDTO } from '../../dtos/AtualizarClienteDTO';

export class AtualizarClienteUseCase {
  constructor(private clienteRepository: IClienteRepository) {}

  async execute(data: AtualizarClienteDTO): Promise<Cliente> {
    const clienteExistente = await this.clienteRepository.buscarPorId(data.id);
    if (!clienteExistente) {
      throw new Error('Cliente não encontrado');
    }

    const clienteAtualizado = new Cliente(
      clienteExistente.id,
      data.nome ?? clienteExistente.nome,
      data.email ?? clienteExistente.email,
      data.cpf ?? clienteExistente.cpf,
      data.recebeEmail ?? clienteExistente.recebeEmail,
      clienteExistente.ativo,
      clienteExistente.criadoEm
    );

    return this.clienteRepository.atualizar(clienteAtualizado);
  }
}
