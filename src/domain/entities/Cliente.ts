export class Cliente {
    constructor(
      public id: string,
      public nome: string,
      public email: string,
      public cpf: string,
      public recebeEmail: boolean,
      public ativo: boolean = true
    ) {}
  }
  