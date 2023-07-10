import { Router } from 'express';

import { authenticateToken } from '@/middlewares';
import { getPaymentTicket, paymentProcess } from '@/controllers';

const paymentsRouter = Router();

paymentsRouter.use(authenticateToken);
paymentsRouter.get('/', getPaymentTicket);
paymentsRouter.post('/process', paymentProcess);

export { paymentsRouter };
