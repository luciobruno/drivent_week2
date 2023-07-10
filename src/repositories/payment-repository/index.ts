import { payment } from '@/protocols';
import { prisma } from '@/config';

async function getPaymentByTicketId(ticketId: number) {
  const payment = await prisma.payment.findFirst({
    where: {
      ticketId: ticketId,
    },
  });
  return payment;
}

async function createPaymentProcess(body: payment, price: number) {
  await prisma.payment.create({
    data: {
      ticketId: body.ticketId,
      cardIssuer: body.cardData.issuer,
      cardLastDigits: body.cardData.number.toString().slice(-4),
      value: price,
    },
  });
  await prisma.ticket.update({
    where: {
      id: body.ticketId,
    },
    data: {
      status: 'PAID',
    },
  });
  const result = await prisma.payment.findFirst({
    where: {
      ticketId: body.ticketId,
    },
    select: {
      id: true,
      ticketId: true,
      value: true,
      cardIssuer: true,
      cardLastDigits: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
}

const paymentRepository = {
  getPaymentByTicketId,
  createPaymentProcess,
};

export default paymentRepository;
