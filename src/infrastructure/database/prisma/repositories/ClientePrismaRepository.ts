import { ClienteRepository } from '../../../application/ports/ClienteRepository';
import { Cliente } from '../../../domain/entities/Cliente';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ClientePrismaRepository implements ClienteRepository {
  async criar(cliente: Cliente): Promise<Cliente> {
    const novo = await prisma.cliente.create({ data: cliente });
    return novo;
  }

  async atualizar(id: string, cliente: Partial<Cliente>): Promise<Cliente | null> {
    return prisma.cliente.update({ where: { id }, data: cliente });
  }

  async inativar(id: string): Promise<void> {
    await prisma.cliente.update({
      where: { id },
      data: { ativo: false },
    });
  }

  // async listar(): Promise<Cliente[]> {
  //   return prisma.cliente.findMany({ where: { ativo: true }, orderBy: { criadoEm: 'desc' } });
  // }
  async listar(): Promise<Cliente[]> {
    const data = await prisma.cliente.findMany({
      where: { ativo: true },
      orderBy: { criadoEm: 'desc' },
    });
  
    return data.map(
      (c) =>
        new Cliente(
          c.id,
          c.nome,
          c.email,
          c.cpf,
          c.recebeEmail,
          c.ativo,
          c.criadoEm
        )
    );
  }

  async buscarPorId(id: string): Promise<Cliente | null> {
    return prisma.cliente.findUnique({ where: { id } });
  }

  async buscarPorCpf(cpf: string): Promise<Cliente | null> {
    const data = await prisma.cliente.findUnique({ where: { cpf } });
    if (!data) return null;
  
    return new Cliente(
      data.id,
      data.nome,
      data.email,
      data.cpf,
      data.recebeEmail,
      data.ativo,
      data.criadoEm
    );
  }

}
