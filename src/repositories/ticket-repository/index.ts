import { prisma } from '@/config';

async function getAllTickets() {
  return prisma.ticketType.findMany();
}

async function getTicketByUser(userId: number) {
  const ticket = prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: userId,
      },
    },
    select: {
      id: true,
      enrollmentId: true,
      ticketTypeId: true,
      TicketType: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return ticket;
}

async function createTicketUser(ticketTypeId: number, enrollmentId: number) {
  const ticket = await prisma.ticket.create({
    data: {
      ticketTypeId: ticketTypeId,
      status: 'RESERVED',
      enrollmentId: enrollmentId,
    },
  });
  return ticket;
}

async function getTicketById(id: number) {
  const ticket = prisma.ticket.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      enrollmentId: true,
      ticketTypeId: true,
      TicketType: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return ticket;
}

async function validationUser(userId: number, ticketId: number) {
  const ticket = await prisma.ticket.findFirst({
    where: {
      AND: [
        { id: ticketId },
        {
          Enrollment: {
            userId: userId,
          },
        },
      ],
    },
  });
  return ticket;
}

const ticketRepository = {
  getAllTickets,
  getTicketByUser,
  createTicketUser,
  getTicketById,
  validationUser,
};

export default ticketRepository;
