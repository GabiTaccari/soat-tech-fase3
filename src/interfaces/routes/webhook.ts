import { Router } from 'express';
import { WebhookController } from '../controllers/WebhookController';

const router = Router();

router.post('/', WebhookController.receberNotificacao);

export default router;
