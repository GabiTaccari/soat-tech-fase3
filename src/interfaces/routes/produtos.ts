import { Router } from 'express';
import { ProdutoController } from '../controllers/ProdutoController';

const router = Router();

router.post('/', ProdutoController.criar);
router.put('/:id', ProdutoController.atualizar);
router.patch('/:id/inativar', ProdutoController.inativar);
router.get('/', ProdutoController.listar);
router.get('/buscar', ProdutoController.buscarPorNome); // <- ANTES do :id
router.get('/:id', ProdutoController.buscarPorId);

export default router;
