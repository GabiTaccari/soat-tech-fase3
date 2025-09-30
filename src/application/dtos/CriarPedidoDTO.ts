export interface ProdutoPedidoDTO {
    id: string;
    quantidade: number;
  }
  
  export interface CriarPedidoDTO {
    produtos: ProdutoPedidoDTO[];
    clienteId?: string; //opcional
  }
  