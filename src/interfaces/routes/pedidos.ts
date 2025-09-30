/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: Gerenciamento de pedidos
 */

/**
 * @swagger
 * /api/pedidos/checkout:
 *   post:
 *     summary: Realiza o checkout de um novo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               produtos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     nome:
 *                       type: string
 *                     preco:
 *                       type: number
 *                     quantidade:
 *                       type: number
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pedidoId:
 *                   type: string
 */

/**
 * @swagger
 * /api/pedidos/{id}/status-pagamento:
 *   get:
 *     summary: Consulta o status de pagamento de um pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pedido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Status retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 */





/**
 * @swagger
 * /api/pedidos:
 *   get:
 *     summary: Lista todos os pedidos visíveis ordenados (cozinha)
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   status:
 *                     type: string
 *                   statusPagamento:
 *                     type: string
 *                   dataCriacao:
 *                     type: string
 *                     format: date-time
 *                   produtos:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         nome:
 *                           type: string
 *                         preco:
 *                           type: number
 *                         quantidade:
 *                           type: number
 */

/**
 * @swagger
 * /api/pedidos/{id}/atualizar-status:
 *   patch:
 *     summary: Atualiza o status de um pedido (ex: cozinha)
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pedido
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               novoStatus:
 *                 type: string
 *                 enum: [RECEBIDO, EM_PREPARACAO, PRONTO, FINALIZADO]
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 */

/**
 * @swagger
 * /api/pedidos/{id}/status:
 *   get:
 *     summary: Consulta o status do pedido (produção + pagamento)
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pedido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Status retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusPedido:
 *                   type: string
 *                 statusPagamento:
 *                   type: string
 */

/**
 * @swagger
 * /api/pedidos/{id}/atualizar-status-idiota:
 *   patch:
 *     summary: Atualiza o status de um pedido (ex: cozinha)
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pedido
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               novoStatus:
 *                 type: string
 *                 enum: [RECEBIDO, EM_PREPARACAO, PRONTO, FINALIZADO]
 *     responses:
 *       200:
 *         description: Status atualizado com sucesso
 */

// import { Router } from 'express';
// import { CheckoutController } from '../controllers/CheckoutController';
// import { ConsultarStatusPagamentoController } from '../controllers/ConsultarStatusPagamentoController';
// import { AtualizarStatusPedidoController } from '../controllers/AtualizarStatusPedidoController';
// import { ConsultarStatusPedidoController } from '../controllers/ConsultarStatusPedidoController';
// import { ListarPedidosController } from '../controllers/ListarPedidosController';

// const router = Router();

// router.post('/checkout', CheckoutController.handle);
// router.get('/:id/status-pagamento', ConsultarStatusPagamentoController.handle);
// router.patch('/:id/atualizar-status', AtualizarStatusPedidoController.handle);
// router.get('/:id/status', ConsultarStatusPedidoController.handle);
// router.get('/', ListarPedidosController.handle);


// export default router;


import { Router } from 'express';
import { PedidoController } from '../controllers/PedidoController';

const router = Router();

router.post('/', PedidoController.criar);
router.get('/', PedidoController.listar);
router.get('/:id', PedidoController.buscarPorId);
router.patch('/:id/status', PedidoController.atualizarStatus);
router.patch('/:id/pagamento', PedidoController.atualizarPagamento);
router.get('/:id/pagamento', PedidoController.consultarStatusPagamento);

export default router;
