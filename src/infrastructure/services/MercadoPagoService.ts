import mercadopago from 'mercadopago';
import { v4 as uuidv4 } from 'uuid';
import { Produto } from '../../../domain/entities/Pedido';

export class MercadoPagoService {
  constructor() {
    mercadopago.configure({
      access_token: process.env.MERCADO_PAGO_TOKEN as string,
    });
  }

  async gerarQrCodePagamento(pedidoId: string, produtos: Produto[]): Promise<any> {
    const items = produtos.map((produto) => ({
      title: produto.nome,
      quantity: produto.quantidade,
      unit_price: produto.preco,
      currency_id: 'BRL',
    }));

    const externalReference = pedidoId;
    const idempotencyKey = uuidv4();

     console.log('🔍 Enviando dados para o Mercado Pago:', {
    items,
    external_reference: externalReference,
    notification_url: process.env.MERCADO_PAGO_WEBHOOK_URL,
  });

    const pagamento = await mercadopago.preferences.create({
      items,
      external_reference: externalReference,
      notification_url: process.env.MERCADO_PAGO_WEBHOOK_URL,
    }, {
      idempotencyKey,
    });

    console.log('✅ Resposta do Mercado Pago:', pagamento.body);

    return {
      qrCode: pagamento.body.init_point,
      externalReference,
    };
  }
}
