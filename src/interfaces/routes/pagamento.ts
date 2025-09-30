// import { Router } from 'express';
// import { PagamentoController } from '../controllers/PagamentoController';

// const router = Router();

// // router.post('/', PagamentoController.gerarLink);
// // router.post('/', PagamentoController.gerarQrCodePagamento);
// // router.post('/', PagamentoController.criar);
// router.post('/', PagamentoController.gerarQrCodePagamento);

// export default router;



import { Router } from 'express';
import { PagamentoController } from '../controllers/PagamentoController';

const router = Router();

// router.post('/', PagamentoController.gerarLink);
router.post('/', PagamentoController.gerarQrCodePagamento);

export default router;
