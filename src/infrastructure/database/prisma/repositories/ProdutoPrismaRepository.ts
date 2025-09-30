import { Produto } from '../../../domain/entities/Produto';
import { IProdutoRepository } from '../../../domain/repositories/IProdutoRepository';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ProdutoPrismaRepository implements IProdutoRepository {
  async criar(produto: Produto): Promise<Produto> {
    const data = await prisma.produto.create({
      data: {
        id: produto.id,
        nome: produto.nome,
        descricao: produto.descricao,
        preco: produto.preco,
        imagemUrl: produto.imagemUrl,
        categoriaId: produto.categoriaId,
        ativo: produto.ativo,
      },
    });

    return new Produto(
      data.id,
      data.nome,
      data.descricao,
      data.preco,
      data.imagemUrl,
      data.categoriaId,
      data.ativo,
      data.criadoEm
    );
  }

  async atualizar(produto: Produto): Promise<Produto> {
    const data = await prisma.produto.update({
      where: { id: produto.id },
      data: {
        nome: produto.nome,
        descricao: produto.descricao,
        preco: produto.preco,
        imagemUrl: produto.imagemUrl,
        categoriaId: produto.categoriaId,
      },
    });

    return new Produto(
      data.id,
      data.nome,
      data.descricao,
      data.preco,
      data.imagemUrl,
      data.categoriaId,
      data.ativo,
      data.criadoEm
    );
  }

  async inativar(id: string): Promise<void> {
    await prisma.produto.update({
      where: { id },
      data: { ativo: false },
    });
  }

  async listar(): Promise<Produto[]> {
    const produtos = await prisma.produto.findMany({
      where: { ativo: true },
      orderBy: { nome: 'asc' },
    });

    return produtos.map(
      (p) =>
        new Produto(
          p.id,
          p.nome,
          p.descricao,
          p.preco,
          p.imagemUrl,
          p.categoriaId,
          p.ativo,
          p.criadoEm
        )
    );
  }

  async buscarPorId(id: string): Promise<Produto | null> {
    const p = await prisma.produto.findUnique({ where: { id } });
    if (!p) return null;

    return new Produto(
      p.id,
      p.nome,
      p.descricao,
      p.preco,
      p.imagemUrl,
      p.categoriaId,
      p.ativo,
      p.criadoEm
    );
  }

  async buscarPorNome(nome: string): Promise<Produto[]> {
    const produtos = await prisma.produto.findMany({
      where: {
        nome: {
          contains: nome,
          mode: 'insensitive', // busca sem diferenciar maiúsculas/minúsculas
        },
        ativo: true,
      },
      orderBy: { nome: 'asc' },
    });
  
    return produtos.map(p => new Produto(
      p.id,
      p.nome,
      p.descricao,
      p.preco,
      p.imagemUrl,
      p.categoriaId,
      p.ativo,
      p.criadoEm
    ));
  }
}
