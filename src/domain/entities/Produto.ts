export class Produto {
    constructor(
      public id: string,
      public nome: string,
      public descricao: string,
      public preco: number,
      public imagemUrl: string,
      public categoriaId: string,
      public ativo: boolean = true,
      public criadoEm?: Date
    ) {}
  }
  