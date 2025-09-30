import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const categorias = [
    { nome: 'Lanche' },
    { nome: 'Acompanhamento' },
    { nome: 'Bebida' },
    { nome: 'Sobremesa' },
  ];

  for (const categoria of categorias) {
    await prisma.categoriaProduto.upsert({
      where: { nome: categoria.nome },
      update: {},
      create: { nome: categoria.nome },
    });
  }

  const produtos = [
    {
      nome: 'Hambúrguer Clássico',
      descricao: 'Pão, carne e queijo',
      preco: 0.05,
      categoria: 'Lanche',
    },
    {
      nome: 'Batata Frita',
      descricao: 'Batatas crocantes',
      preco: 0.01,
      categoria: 'Acompanhamento',
    },
    {
      nome: 'Coca-Cola',
      descricao: 'Refrigerante 350ml',
      preco: 0.02,
      categoria: 'Bebida',
    },
    {
      nome: 'Sorvete de Chocolate',
      descricao: '1 bola de chocolate',
      preco: 0.06,
      categoria: 'Sobremesa',
    },
  ];

  for (const p of produtos) {
    const categoria = await prisma.categoriaProduto.findUnique({
      where: { nome: p.categoria },
    });

    await prisma.produto.upsert({
      where: { nome: p.nome },
      update: {},
      create: {
        nome: p.nome,
        descricao: p.descricao,
        preco: p.preco,
        categoriaId: categoria!.id,
      },
    });
  }

  console.log('Seeder rodado com sucesso ✅');
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
