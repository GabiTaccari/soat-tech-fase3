import { IPedidoRepository } from '../repositories/IPedidoRepository';
import { MercadoPagoService } from '../../infrastructure/services/MercadoPagoService';

export class CheckoutPagamento {
  constructor(
    private pedidoRepository: IPedidoRepository,
    private mercadoPagoService: MercadoPagoService
  ) {}

  async gerarQrCodePagamento(pedidoId: string): Promise<string> {
  const pedido = await this.pedidoRepository.buscarPorId(pedidoId);
  if (!pedido) {
    throw new Error('Pedido não encontrado');
  }

  if (!pedido.produtos || pedido.produtos.length === 0) {
    throw new Error('Pedido sem itens');
  }

  const valorTotal = pedido.produtos.reduce((total, item) => {
    return total + item.preco * item.quantidade;
  }, 0);

  const qrCode = await this.mercadoPagoService.gerarQRCode(valorTotal, pedidoId);
  return qrCode;
}
}