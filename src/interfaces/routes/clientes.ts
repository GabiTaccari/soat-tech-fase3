// src/interfaces/routes/clientes.ts
import { Router } from 'express';
import { ClienteController } from '../controllers/ClienteController';

const router = Router();

router.post('/', ClienteController.criar);
router.put('/:id', ClienteController.atualizar);
router.put('/:id/inativar', ClienteController.inativar);
router.get('/', ClienteController.listar);
router.get('/cpf/:cpf', ClienteController.buscarPorCpf);

export default router;
