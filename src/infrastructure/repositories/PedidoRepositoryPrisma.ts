// // src/infra/repositories/PedidoRepositoryPrisma.ts
// import { PrismaClient } from '@prisma/client';
// import { Pedido, Produto } from '../../domain/entities/Pedido';
// import { IPedidoRepository } from '../../domain/repositories/IPedidoRepository';

// const prisma = new PrismaClient();

// export class PedidoRepositoryPrisma implements IPedidoRepository {
//   async criarPedido(produtos: Produto[], clienteId?: string): Promise<string> {
//     const pedido = await prisma.pedido.create({
//       data: {
//         clienteId: clienteId ?? null,
//         statusPedido: 'RECEBIDO',
//         statusPagamento: 'AGUARDANDO',
//         itens: {
//           create: produtos.map((p) => ({
//             produtoId: p.id,
//             quantidade: p.quantidade,
//           })),
//         },
//       },
//     });

//     return pedido.id;
//   }

//   async listar(): Promise<Pedido[]> {
//     return prisma.pedido.findMany({
//       include: { itens: true, cliente: true },
//       orderBy: { createdAt: 'desc' },
//     });
//   }

//   async listarPorCpf(cpf: string): Promise<Pedido[]> {
//     return prisma.pedido.findMany({
//       where: { cliente: { cpf } },   // filtro pela relação cliente.cpf
//       include: { itens: true, cliente: true },
//       orderBy: { createdAt: 'desc' },
//     });
//   }
// }


// // src/infra/repositories/PedidoRepositoryPrisma.ts
// import { PrismaClient } from '@prisma/client';
// import { IPedidoRepository } from '../../domain/repositories/IPedidoRepository';
// import { Pedido, Produto } from '../../domain/entities/Pedido';

// const prisma = new PrismaClient();

// export class PedidoRepositoryPrisma implements IPedidoRepository {
//   async criarPedido(produtos: Produto[], clienteId?: string): Promise<string> {
//     const pedido = await prisma.pedido.create({
//       data: {
//         clienteId: clienteId ?? null,
//         statusPedido: 'RECEBIDO',
//         statusPagamento: 'AGUARDANDO',
//         itens: {
//           create: produtos.map((p) => ({
//             produtoId: p.id,
//             quantidade: p.quantidade,
//           })),
//         },
//       },
//     });
//     return pedido.id;
//   }

//   async listar(): Promise<Pedido[]> {
//     return prisma.pedido.findMany({
//       // include: { itens: true, cliente: true },  // <- inclui a relação
//       // orderBy: { createdAt: 'desc' },
//       include: { itens: true, cliente: true },
//       orderBy: { criadoEm: 'desc' }, 
//     });
//   }

//   async listarPorCpf(cpf: string): Promise<Pedido[]> {
//     // 1) acha o cliente pelo CPF
//     const cliente = await prisma.cliente.findUnique({ where: { cpf } });
//     if (!cliente) return [];

//     // 2) filtra no banco por clienteId (independe do nome da relação)
//     return prisma.pedido.findMany({
//       where: { clienteId: cliente.id },
//       // include: { itens: true, cliente: true },
//       // orderBy: { createdAt: 'desc' },
//       include: { itens: true, cliente: true },
//       orderBy: { criadoEm: 'desc' },
//     });
//   }
// }


import { PrismaClient } from '@prisma/client';
import { IPedidoRepository } from '../../../domain/repositories/IPedidoRepository';
import { Pedido } from '../../../domain/entities/Pedido';
import { AtualizarPedidoDTO } from '../../../domain/dto/AtualizarPedidoDTO';

const prisma = new PrismaClient();

export class PedidoPrismaRepository implements IPedidoRepository {
  async criar(pedido: Pedido): Promise<Pedido> {
    // ... sua implementação existente ...
    // (mantenha o que já tinha aqui)
    return prisma.pedido.create({
      data: {
        clienteId: (pedido as any).clienteId ?? null,
        statusPedido: pedido.statusPedido as any,
        statusPagamento: pedido.statusPagamento as any,
        itens: {
          create: (pedido as any).produtos?.map((p: any) => ({
            produtoId: p.id,
            quantidade: p.quantidade,
          })) || [],
        },
      },
      include: { itens: true, cliente: true },
    }) as any;
  }

  async atualizar(id: string, data: AtualizarPedidoDTO): Promise<void> {
    await prisma.pedido.update({
      where: { id },
      data: { statusPedido: data.status as any },
    });
  }

  async buscarPorId(id: string): Promise<Pedido | null> {
    return prisma.pedido.findUnique({
      where: { id },
      include: { itens: true, cliente: true, pagamento: true },
    }) as any;
  }

  async listar(): Promise<Pedido[]> {
    return prisma.pedido.findMany({
      include: { itens: true, cliente: true },
      orderBy: { criadoEm: 'desc' }, // <- campo correto
    }) as any;
  }

  async atualizarStatus(id: string, status: string): Promise<void> {
    await prisma.pedido.update({
      where: { id },
      data: { statusPedido: status as any },
    });
  }

  async atualizarStatusPagamento(id: string, status: any): Promise<void> {
    await prisma.pedido.update({
      where: { id },
      data: { statusPagamento: status },
    });
  }

  // ✅ novo: filtrar por CPF (cliente -> clienteId)
  async listarPorCpf(cpf: string): Promise<Pedido[]> {
    const cliente = await prisma.cliente.findUnique({ where: { cpf } });
    if (!cliente) return [];
    return prisma.pedido.findMany({
      where: { clienteId: cliente.id },
      include: { itens: true, cliente: true },
      orderBy: { criadoEm: 'desc' },
    }) as any;
  }
}

