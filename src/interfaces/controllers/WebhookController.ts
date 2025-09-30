import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

function mapStatusMercadoPago(statusMP: string): string {
  switch (statusMP.toUpperCase()) {
    case 'APPROVED':
      return 'APROVADO';
    case 'PENDING':
      return 'AGUARDANDO';
    case 'REJECTED':
      return 'RECUSADO';
    default:
      return 'DESCONHECIDO';
  }
}

export class WebhookController {
  static async receberNotificacao(req: Request, res: Response) {
    try {
      const { action, data } = req.body;

      console.log('📥 Webhook recebido:', action, data);

      if (!['payment.created', 'payment.updated'].includes(action)) {
        return res.status(200).send('Evento ignorado');
      }

      const pagamentoId = data?.id;

      if (!pagamentoId) {
        console.warn('Webhook sem ID de pagamento');
        return res.status(400).send('ID de pagamento ausente');
      }

      let pagamentoMP: any;

      try {
        const response = await axios.get(
          `https://api.mercadopago.com/v1/payments/${pagamentoId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
            },
          }
        );
        pagamentoMP = response.data;
      } catch (error: any) {
        if (error.response?.status === 404) {
          console.warn(`Pagamento ${pagamentoId} não encontrado via ID. Tentando via fallback...`);
        } else {
          throw error;
        }
      }

      if (!pagamentoMP) {
        const searchResponse = await axios.get(
          `https://api.mercadopago.com/v1/payments/search`,
          {
            headers: {
              Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
            },
            params: {
              sort: 'date_created',
              criteria: 'desc',
              limit: 1,
              query: {
                id: pagamentoId,
              },
            },
          }
        );

        const resultado = searchResponse.data?.results?.[0];

        if (!resultado) {
          console.error('Pagamento ainda não disponível após fallback.');
          return res.status(404).send('Pagamento não encontrado');
        }

        pagamentoMP = resultado;
      }

      const pedidoId = pagamentoMP.external_reference;
      const statusMP = pagamentoMP.status?.toUpperCase();
    //   const status = mapStatusMercadoPago(statusMP);

      if (!pedidoId) {
        console.warn('Pagamento sem external_reference');
        return res.status(200).send('Pagamento sem referência externa');
      }


    const statusInterno = mapStatusMercadoPago(statusMP);

    await prisma.pagamento.updateMany({
    where: { pedidoId },
    data: {
        status: statusInterno,
    },
    });

    await prisma.pedido.update({
      where: { id: pedidoId },
      data: {
        statusPagamento: statusInterno as StatusPagamento,
        statusPedido:
          statusInterno === 'APROVADO'
            ? 'EM_PREPARACAO'
            : statusInterno === 'RECUSADO'
            ? 'CANCELADO'
            : 'RECEBIDO',
      },
    });

      console.log(`Pagamento do pedido ${pedidoId} atualizado para status ${statusInterno}`);
      return res.status(200).send('OK');
    } catch (error: any) {
      console.error('Erro no webhook:', error?.response?.data || error.message);
      return res.status(500).send('Erro no processamento');
    }
  }
}