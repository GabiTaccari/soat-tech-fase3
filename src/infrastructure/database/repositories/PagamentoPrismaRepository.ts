import { prisma } from '../prisma';
import { IPagamentoRepository, AtualizarStatusPagamentoDTO } from '../../../domain/repositories/IPagamentoRepository';
import { AtualizarPagamentoDTO } from '../../../application/dtos/AtualizarPagamentoDTO';
import { CriarPagamentoDTO } from '../../../application/dtos/CriarPagamentoDTO';

// export class PagamentoPrismaRepository implements IPagamentoRepository {
//   async atualizarPagamento(dto: AtualizarPagamentoDTO): Promise<void> {
//     await prisma.pagamento.upsert({
//       where: { pedidoId: dto.pedidoId },
//       create: {
//         pedidoId: dto.pedidoId,
//         metodo: dto.metodo,
//         status: dto.status,
//       },
//       update: {
//         metodo: dto.metodo,
//         status: dto.status,
//       },
//     });
//   }
// }

export class PagamentoPrismaRepository implements IPagamentoRepository {
    async atualizarStatus({ pedidoId, metodo, status }: AtualizarStatusPagamentoDTO): Promise<void> {
      await prisma.pagamento.updateMany({
        where: { pedidoId },
        data: {
          metodo,
          status: status,
        },
      });
    }

    async criarPagamento(data: CriarPagamentoDTO): Promise<void> {
        await prisma.pagamento.create({
          data: {
            pedidoId: data.pedidoId,
            valor: data.valor,
            metodo: data.metodo,
            status: 'AGUARDANDO',
            criadoEm: new Date(),
          },
        });
      }

      
  }