import { TicketType } from '@prisma/client';
import ticketRepository from '@/repositories/ticket-repository';
import { TicketUser } from '@/protocols';
import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';

async function getTicketsTypes(): Promise<TicketType[]> {
  const tickets = await ticketRepository.getAllTickets();
  return tickets;
}

async function getTicketUser(userId: number): Promise<TicketUser> {
  const enrollmentWithAddress = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollmentWithAddress) throw notFoundError();

  const ticket = await ticketRepository.getTicketByUser(userId);

  if (!ticket) throw notFoundError();

  return ticket;
}

async function createTicketUser(userId: number, ticketTypeId: number): Promise<TicketUser> {
  const enrollmentWithAddress = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollmentWithAddress) throw notFoundError();

  await ticketRepository.createTicketUser(ticketTypeId, enrollmentWithAddress.id);

  const ticket = await ticketRepository.getTicketByUser(userId);

  return ticket;
}

const ticketService = {
  getTicketsTypes,
  getTicketUser,
  createTicketUser,
};

export default ticketService;
