export type Produto = {
    id: string;
    nome: string;
    preco: number;
    quantidade: number;
  };
  
  export type StatusPedido = 'RECEBIDO' | 'EM_PREPARACAO' | 'PRONTO' | 'FINALIZADO';
  export type StatusPagamento = 'APROVADO' | 'RECUSADO' | 'AGUARDANDO';
  
  export class Pedido {
    public id: string;
    public produtos: Produto[];
    public statusPedido: StatusPedido;
    public statusPagamento: StatusPagamento;
    public dataCriacao: Date;
    public clienteId?: string;
  
    constructor(
      id: string,
      produtos: Produto[],
      clienteId?: string
    ) {
      this.id = id;
      this.produtos = produtos;
      this.statusPedido = '';
      this.statusPagamento = '';
      this.dataCriacao = new Date();
      this.clienteId = clienteId;
    }
  }

  export enum StatusPedidoEnum {
    RECEBIDO = 'RECEBIDO',
    EM_PREPARACAO = 'EM_PREPARACAO',
    PRONTO = 'PRONTO',
    FINALIZADO = 'FINALIZADO'
  }
  
  