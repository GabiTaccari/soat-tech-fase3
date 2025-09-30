import { Pedido } from '../../../domain/entities/Pedido';
import { IPedidoRepository } from '../../../domain/repositories/IPedidoRepository';
import { IClienteRepository } from '../../../domain/repositories/IClienteRepository';
import { IProdutoRepository } from '../../../domain/repositories/IProdutoRepository';
import { CriarPedidoDTO } from '../../dtos/CriarPedidoDTO';
import { v4 as uuidv4 } from 'uuid';

export class CriarPedidoUseCase {
  constructor(
    private pedidoRepository: IPedidoRepository,
    private clienteRepository: IClienteRepository,
    private produtoRepository: IProdutoRepository
  ) {}

  async execute(data: CriarPedidoDTO): Promise<Pedido> {
    if (data.clienteId) {
      const cliente = await this.clienteRepository.buscarPorId(data.clienteId);
      if (!cliente) {
        throw new Error('Cliente não encontrado');
      }
    }

    const produtos = await Promise.all(
      data.produtos.map(async (p) => {
        const produto = await this.produtoRepository.buscarPorId(p.id);
        if (!produto) {
          throw new Error(`Produto com ID ${p.id} não encontrado`);
        }

        return {
          id: produto.id,
          nome: produto.nome,
          preco: produto.preco,
          quantidade: p.quantidade,
        };
      })
    );

    const pedido = new Pedido(uuidv4(), produtos, data.clienteId);
    return this.pedidoRepository.criar(pedido);
  }
}
