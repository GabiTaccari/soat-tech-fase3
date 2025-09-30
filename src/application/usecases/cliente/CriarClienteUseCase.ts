import { IClienteRepository } from '../../../domain/repositories/IClienteRepository';
import { Cliente } from '../../../domain/entities/Cliente';
import { v4 as uuidv4 } from 'uuid';
import { CriarClienteDTO } from '../../dtos/CriarClienteDTO';

export class CriarClienteUseCase {
  constructor(private clienteRepository: IClienteRepository) {}

  async execute(data: CriarClienteDTO): Promise<Cliente> {
    const clienteExistente = await this.clienteRepository.buscarPorCpf(data.cpf);
    if (clienteExistente) {
      throw new Error('Já existe um cliente com esse CPF');
    }

    const cliente = new Cliente(
      uuidv4(),
      data.nome,
      data.email,
      data.cpf,
      data.recebeEmail,
      true
    );

    return this.clienteRepository.criar(cliente);
  }
}
