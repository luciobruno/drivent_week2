import ticketRepository from '@/repositories/ticket-repository';
import { notFoundError, unauthorizedError } from '@/errors';
import paymentRepository from '@/repositories/payment-repository';
import { Ticket, payment } from '@/protocols';

async function getPaymentTicket(ticketId: number, userId: number): Promise<Ticket> {
  const isValidTicket = await ticketRepository.getTicketById(ticketId);
  if (!isValidTicket) throw notFoundError();
  const userValidation = await ticketRepository.validationUser(userId, ticketId);
  if (!userValidation) throw unauthorizedError();
  const ticket = await paymentRepository.getPaymentByTicketId(ticketId);
  return ticket;
}

async function createPaymentProcess(body: payment, userId: number) {
  const isValidTicket = await ticketRepository.getTicketById(body.ticketId);
  if (!isValidTicket) throw notFoundError();
  const userValidation = await ticketRepository.validationUser(userId, body.ticketId);
  if (!userValidation) throw unauthorizedError();
  const ticket = await paymentRepository.createPaymentProcess(body, isValidTicket.TicketType.price);
  return ticket;
}

const paymentServices = {
  getPaymentTicket,
  createPaymentProcess,
};

export default paymentServices;
