import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentServices from '@/services/payments-service';
import { payment } from '@/protocols';

export async function getPaymentTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  const { userId } = req;
  try {
    if (!ticketId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const ticket = await paymentServices.getPaymentTicket(Number(ticketId), userId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    if (error.name === 'UnauthorizedError') {
      return res.status(httpStatus.UNAUTHORIZED).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function paymentProcess(req: AuthenticatedRequest, res: Response) {
  const body = req.body as payment;
  const { userId } = req;
  try {
    if (!body.cardData || !body.ticketId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const ticket = await paymentServices.createPaymentProcess(body, userId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
