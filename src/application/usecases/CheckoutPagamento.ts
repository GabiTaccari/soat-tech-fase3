import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import mercadopago from '../../config/mercadoPago';

const prisma = new PrismaClient();

export class CheckoutPagamento {
  async gerarQrCodePagamento(pedidoId: string): Promise<string> {
    console.log('🔍 Iniciando geração de QR Code...');
    const pedido = await prisma.pedido.findUnique({
      where: { id: pedidoId },
      include: {
        itens: {
          include: {
            produto: true,
          },
        },
      },
    });

    if (!pedido) {
      throw new Error('Pedido não encontrado');
    }

    const total = pedido.itens.reduce((acc, item) => {
      return acc + item.produto.preco * item.quantidade;
    }, 0);


    console.log('🔗 Dados do Pedido:', {
    pedidoId,
    total,
    produtos: pedido.itens.map((item) => ({
      nome: item.produto.nome,
      preco: item.produto.preco,
      quantidade: item.quantidade,
    })),
  });


    console.log('🔗 External reference sendo enviada:', pedidoId);
    const qrCodePayload = {
      title: 'Pagamento Pedido ' + pedidoId,
      description: 'Pedido gerado via QR Code',
      total_amount: total,
      external_reference: pedidoId,
      // notification_url: 'https://c226b035c5a9.ngrok-free.app/webhook',  minikube: http://127.0.0.1:55046/
      notification_url: 'https://81a3f5d7152b.ngrok-free.app', //http://127.0.0.1:55046/webhook
      items: pedido.itens.map((item) => ({
        title: item.produto.nome,
        quantity: item.quantidade,
        unit_price: item.produto.preco,
        unit_measure: 'unit',
        total_amount: item.produto.preco * item.quantidade,
      })),
    };
    
    try {
      const user_id = process.env.MP_COLLECTOR_ID!;
      const external_pos_id = '01'; 
      console.log('🧾 user_id:', user_id);

      const response = await axios.post(
        `https://api.mercadopago.com/instore/orders/qr/seller/collectors/${user_id}/pos/${external_pos_id}/qrs`,
        qrCodePayload,
        {
          headers: {
            Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const qrImage = response.data.qr_data;

      await prisma.pagamento.create({
        data: {
          pedidoId,
          metodo: 'QR_CODE',
          status: 'AGUARDANDO',
        },
      });

      console.log('✅ QR Code gerado e pagamento registrado');
      return qrImage;

    } catch (error: any) {
      console.error('❌ Erro ao gerar QR Code:', error.response?.data || error.message);
      throw new Error('Erro ao gerar QR Code');
    }
  }
}
