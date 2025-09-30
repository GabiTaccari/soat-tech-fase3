import { Pedido } from '../../domain/entities/Pedido';

// export class ListarPedidosPresenter {
//   format(pedidos: Pedido[]) {
//     return pedidos.map(pedido => ({
//       id: pedido.id,
//       clienteId: pedido.clienteId,
//       statusPedido: pedido.statusPedido, 
//       statusPagamento: pedido.statusPagamento,
//       dataCriacao: pedido.dataCriacao,
//       produtos: pedido.produtos,
//     }));
//   }
// }
export class ListarPedidosPresenter {
   format(pedidos: Pedido[]) {
     return pedidos.map(pedido => ({
       id: pedido.id,
       clienteId: pedido.clienteId,
       statusPedido: pedido.statusPedido, 
       statusPagamento: pedido.statusPagamento,
      // usa o nome do Prisma e expõe no contrato antigo
      dataCriacao: (pedido as any).criadoEm ?? (pedido as any).dataCriacao,
      produtos: Array.isArray((pedido as any).itens)
        ? (pedido as any).itens.map((i: any) => ({
            produtoId: i.produtoId,
            quantidade: i.quantidade
          }))
        : (pedido as any).produtos
     }));
   }
}