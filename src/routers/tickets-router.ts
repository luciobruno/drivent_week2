import { Router } from 'express';

import { createTicketSchema } from '@/schemas';
import { validateBody, authenticateToken } from '@/middlewares';
import { createTicketUser, getAllTicketsTypes, getTicketUser } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter.use(authenticateToken);
ticketsRouter.get('/types', getAllTicketsTypes);
ticketsRouter.get('/', getTicketUser);
ticketsRouter.post('/', validateBody(createTicketSchema), createTicketUser);

export { ticketsRouter };
