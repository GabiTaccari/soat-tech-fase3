export interface AtualizarPedidoDTO {
    statusPedido?: 'RECEBIDO' | 'EM_PREPARACAO' | 'PRONTO' | 'FINALIZADO' | 'CANCELADO';
    statusPagamento?: 'AGUARDANDO' | 'APROVADO' | 'RECUSADO' | 'DESCONHECIDO';
  }



  