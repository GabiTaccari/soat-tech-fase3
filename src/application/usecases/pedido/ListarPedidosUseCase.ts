
// import { IPedidoRepository } from '../../../domain/repositories/IPedidoRepository';
// import { Pedido } from '../../../domain/entities/Pedido';

// export class ListarPedidosUseCase {
//   constructor(private pedidoRepository: IPedidoRepository) {}

//   async execute(): Promise<Pedido[]> {
//     const pedidos = await this.pedidoRepository.listar();

//     const pedidosFiltrados = pedidos.filter(pedido => pedido.statusPedido !== 'FINALIZADO');

//     // Ordena os pedidos
//     const pedidosOrdenados = pedidosFiltrados.sort((a, b) => {
//       const statusOrder = {
//         'PRONTO': 1,
//         'EM_PREPARACAO': 2,
//         'RECEBIDO': 3,
//       };

//       const statusComparison = statusOrder[a.statusPedido] - statusOrder[b.statusPedido];
      
//       if (statusComparison !== 0) {
//         return statusComparison; 
//       }

//       return new Date(a.dataCriacao).getTime() - new Date(b.dataCriacao).getTime();
//     });

//     return pedidosOrdenados;
//   }
// }


// import { IPedidoRepository } from '../../../domain/repositories/IPedidoRepository';
// import { Pedido } from '../../../domain/entities/Pedido';

// export class ListarPedidosUseCase {
//   constructor(private pedidoRepository: IPedidoRepository) {}

//   async execute(): Promise<Pedido[]> {
//     const pedidos = await this.pedidoRepository.listar();

//     const pedidosFiltrados = pedidos.filter(pedido => pedido.statusPedido !== 'FINALIZADO');

//     // Ordena os pedidos
//     const pedidosOrdenados = pedidosFiltrados.sort((a, b) => {
//       const statusOrder = {
//         'PRONTO': 1,
//         'EM_PREPARACAO': 2,
//         'RECEBIDO': 3,
//       };

//       const statusComparison = statusOrder[a.statusPedido] - statusOrder[b.statusPedido];
      
//       if (statusComparison !== 0) {
//         return statusComparison; 
//       }

//       return new Date(a.dataCriacao).getTime() - new Date(b.dataCriacao).getTime();
//     });

//     return pedidosOrdenados;
//   }
// }


// import { IPedidoRepository } from '../../../domain/repositories/IPedidoRepository';
// import { Pedido } from '../../../domain/entities/Pedido';

// type ListarParams = { cpf?: string };

// export class ListarPedidosUseCase {
//   constructor(private pedidoRepository: IPedidoRepository) {}

//   async execute(params?: ListarParams): Promise<Pedido[]> {
//     const cpf = params?.cpf;

//     const pedidos = cpf
//       ? await this.pedidoRepository.listarPorCpf(cpf)
//       : await this.pedidoRepository.listar();

//     const pedidosFiltrados = pedidos.filter(p => p.statusPedido !== 'FINALIZADO');

//     const statusOrder: Record<string, number> = { PRONTO: 1, EM_PREPARACAO: 2, RECEBIDO: 3 };
//     const pedidosOrdenados = pedidosFiltrados.sort((a, b) => {
//       const statusComparison = (statusOrder[a.statusPedido] ?? 99) - (statusOrder[b.statusPedido] ?? 99);
//       if (statusComparison !== 0) return statusComparison;
//       return new Date(a.dataCriacao).getTime() - new Date(b.dataCriacao).getTime();
//     });

//     return pedidosOrdenados;
//   }
// }

// src/application/usecases/ListarPedidosUseCase.ts
import { IPedidoRepository } from '../../../domain/repositories/IPedidoRepository';
import { Pedido } from '../../../domain/entities/Pedido';

type ListarParams = { cpf?: string };

export class ListarPedidosUseCase {
  constructor(private pedidoRepository: IPedidoRepository) {}

  // async execute(params?: ListarParams): Promise<Pedido[]> {
  //   const cpf = params?.cpf;

  //   // Busca geral no repositório e depois filtra por CPF (evita erro de schema/relação no Prisma)
  //   const pedidos = await this.pedidoRepository.listar();

  //   const somenteDoCpf = cpf
  //     ? pedidos.filter(p => (p as any)?.cliente?.cpf === cpf || (p as any)?.cpfCliente === cpf)
  //     : pedidos;

  //   const pedidosFiltrados = somenteDoCpf.filter(p => p.statusPedido !== 'FINALIZADO');

  //   const statusOrder: Record<string, number> = { PRONTO: 1, EM_PREPARACAO: 2, RECEBIDO: 3 };
  //   const pedidosOrdenados = pedidosFiltrados.sort((a, b) => {
  //     const s = (statusOrder[a.statusPedido] ?? 99) - (statusOrder[b.statusPedido] ?? 99);
  //     if (s !== 0) return s;
  //     return new Date(a.dataCriacao).getTime() - new Date(b.dataCriacao).getTime();
  //   });

  //   return pedidosOrdenados;
  // }
  
async execute(params?: ListarParams): Promise<Pedido[]> {
  const cpf = params?.cpf;
  const pedidos = cpf
    ? await this.pedidoRepository.listarPorCpf(cpf)
    : await this.pedidoRepository.listar();

  const filtrados = pedidos.filter(p => p.statusPedido !== 'FINALIZADO');
  const ord = { PRONTO: 1, EM_PREPARACAO: 2, RECEBIDO: 3 } as Record<string, number>;
  // return filtrados.sort((a,b)=> (ord[a.statusPedido]??99)-(ord[b.statusPedido]??99)
  //   || new Date(a.dataCriacao).getTime()-new Date(b.dataCriacao).getTime());

  return filtrados.sort((a,b)=> {
    const s = (ord[a.statusPedido]??99)-(ord[b.statusPedido]??99);
    if (s !== 0) return s;
    const da = new Date((a as any).criadoEm ?? (a as any).dataCriacao).getTime();
    const db = new Date((b as any).criadoEm ?? (b as any).dataCriacao).getTime();
    return da - db;
  });
}

}