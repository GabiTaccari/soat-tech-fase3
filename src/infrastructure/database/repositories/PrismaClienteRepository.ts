// src/infrastructure/database/repositories/PrismaClienteRepository.ts
import { PrismaClient } from '@prisma/client';
import { Cliente } from '../../../domain/entities/Cliente';
import { ClienteRepository } from '../../../domain/ports/ClienteRepository';

const prisma = new PrismaClient();

export class PrismaClienteRepository implements ClienteRepository {
  async criar(cliente: Cliente): Promise<Cliente> {
    const data = await prisma.cliente.create({
      data: {
        id: cliente.id,
        nome: cliente.nome,
        email: cliente.email,
        cpf: cliente.cpf,
        recebeEmail: cliente.recebeEmail,
        ativo: cliente.ativo,
      },
    });
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

  async atualizar(cliente: Cliente): Promise<Cliente> {
    const data = await prisma.cliente.update({
      where: { id: cliente.id },
      data: {
        nome: cliente.nome,
        email: cliente.email,
        cpf: cliente.cpf,
        recebeEmail: cliente.recebeEmail,
      },
    });

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

  async inativar(id: string): Promise<void> {
    await prisma.cliente.update({
      where: { id },
      data: { ativo: false },
    });
  }

  async buscarPorId(id: string): Promise<Cliente | null> {
    const data = await prisma.cliente.findUnique({ where: { id } });
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
