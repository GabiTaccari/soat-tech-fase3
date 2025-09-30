import { CheckoutPagamento } from '../../../application/services/CheckoutPagamento';
import { CriarPagamentoDTO } from '../../dtos/CriarPagamentoDTO';
import { PagamentoPrismaRepository } from '../../../infrastructure/database/repositories/PagamentoPrismaRepository';
import { IPagamentoRepository } from '../../../domain/repositories/IPagamentoRepository';

export class GerarPagamentoQRCodeUseCase {
  constructor(
    private checkout: CheckoutPagamento,
    private pagamentoRepository: IPagamentoRepository
  ) {}

  async execute(dto: CriarPagamentoDTO): Promise<any> {
    const { pedidoId } = dto;

    const qrCode = await this.checkout.gerarQrCodePagamento(pedidoId);

    await this.pagamentoRepository.criar({
      pedidoId,
      metodo: 'PIX',
      status: 'AGUARDANDO',
      criadoEm: new Date()
    });

    return qrCode;
  }
}
