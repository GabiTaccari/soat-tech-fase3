-- AlterTable
ALTER TABLE "cliente" ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "recebeEmail" BOOLEAN NOT NULL DEFAULT false;
