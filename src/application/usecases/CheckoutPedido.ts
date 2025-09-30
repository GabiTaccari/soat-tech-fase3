import { PrismaClient, StatusPedido, StatusPagamento } from '@prisma/client';

const prisma = new PrismaClient();

interface ProdutoPedidoInput {
  id: string;
  quantidade: number;
}

export class CheckoutPedido {
  async execute(produtos: ProdutoPedidoInput[], clienteId?: string): Promise<string> {
    const produtosEncontrados = await prisma.produto.findMany({
      where: {
        id: { in: produtos.map(p => p.id) },
      },
    });

    if (produtosEncontrados.length !== produtos.length) {
      throw new Error('Um ou mais produtos não foram encontrados');
    }
    
    const pedido = await prisma.pedido.create({
      data: {
        statusPedido: 'RECEBIDO',
        statusPagamento: 'AGUARDANDO',
        clienteId: clienteId || null,
        itens: {
            create: produtos.map(p => ({
              produtoId: p.id,
              quantidade: p.quantidade
            }))
        }
      },
    });

    return pedido.id;
  }
}
