import { Categoria } from '../../../domain/entities/Categoria';
import { prisma } from '../../../infrastructure/database/prisma'; 

export class PrismaCategoriaRepository {
  async listar(): Promise<Categoria[]> {
    const categorias = await prisma.categoriaProduto.findMany();  
    return categorias.map(c => new Categoria(c.id, c.nome, c.descricao));  
  }
}
