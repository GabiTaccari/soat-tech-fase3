// src/infrastructure/database/repositories/PedidoPrismaRepository.ts
import { Pedido as PedidoEntity, Produto } from '../../../domain/entities/Pedido';
import { IPedidoRepository } from '../../../domain/repositories/IPedidoRepository';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PedidoPrismaRepository implements IPedidoRepository {
  async criar(pedido: PedidoEntity): Promise<PedidoEntity> {
    await prisma.pedido.create({
      data: {
        id: pedido.id,
        statusPedido: 'RECEBIDO',  // Valor correto para statusPedido
        statusPagamento: pedido.statusPagamento || 'AGUARDANDO',  // Garantir que é um valor válido de StatusPagamento
        criadoEm: pedido.dataCriacao,
        cliente: pedido.clienteId
          ? { connect: { id: pedido.clienteId } }
          : undefined,
        itens: {
          create: pedido.produtos.map((produto) => ({
            produtoId: produto.id,
            quantidade: produto.quantidade,
          })),
        },
      },
    });

    return pedido;
  }
//   async buscarPorId(id: string): Promise<PedidoEntity | null> {
//     const data = await prisma.pedido.findUnique({
//   where: { id },
//   include: {
//     itens: {
//       include: {
//         produto: true, // importante para calcular o total no MercadoPago
//       },
//     },
//   },
// });
  
//     if (!data) return null;
  
//     const produtos = data.itens.map((item) => ({
//       id: item.produto.id,
//       nome: item.produto.nome,
//       preco: item.produto.preco,
//       quantidade: item.quantidade
//     }));
  
//     const pedido = new PedidoEntity(data.id, produtos, data.clienteId || undefined);
//     pedido.status = data.statusPedido;
//     pedido.statusPagamento = data.statusPagamento;
//     pedido.dataCriacao = data.criadoEm;
  
//     return pedido;
//   }

  async buscarPorId(id: string): Promise<PedidoEntity | null> {
    const data = await prisma.pedido.findUnique({
      where: { id },
      include: {
        cliente: true,
        pagamento: true,
        itens: {
          include: {
            produto: true
          }
        }
      }
    });
  
    if (!data) return null;
  
    const produtos = data.itens.map((item) => ({
      id: item.produto.id,
      nome: item.produto.nome,
      preco: item.produto.preco,
      quantidade: item.quantidade
    }));
  
    const pedido = new PedidoEntity(data.id, produtos, data.clienteId || undefined);
    pedido.status = data.statusPedido;
    pedido.statusPagamento = data.statusPagamento;
    pedido.dataCriacao = data.criadoEm;
  
    return pedido;
  }

  async atualizarStatus(id: string, status: StatusPedido): Promise<void> {
    await prisma.pedido.update({
      where: { id },
      data: { statusPedido: status },
    });
  }

  async listar(): Promise<PedidoEntity[]> {
  const pedidosData = await prisma.pedido.findMany({
    include: {
      itens: {
        include: {
          produto: true
        }
      },
      cliente: true,
      pagamento: true
    },
    orderBy: { criadoEm: 'desc' }
  });

  return pedidosData.map((data) => {
    const produtos: Produto[] = data.itens.map((item) => ({
      id: item.produto.id,
      nome: item.produto.nome,
      preco: item.produto.preco,
      quantidade: item.quantidade,
    }));

    // Criando o pedido e atribuindo o status corretamente
    const pedido = new PedidoEntity(data.id, produtos, data.clienteId || undefined);
    pedido.statusPedido = data.statusPedido;  // Garantindo que statusPedido está sendo atribuído corretamente
    pedido.statusPagamento = data.statusPagamento;
    pedido.dataCriacao = data.criadoEm;

    return pedido;
  });
}

  //atualizarStatusPagamento
  async atualizarStatusPagamento(id: string, status: StatusPagamento): Promise<void> {
    console.log('Atualizando status de pagamento do pedido:', { id, status });
    
    // Usando Prisma para atualizar o status de pagamento
    await prisma.pedido.update({
      where: { id },
      data: { statusPagamento: status },
    });
  }

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
