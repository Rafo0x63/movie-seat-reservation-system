import express from 'express';
import { PrismaClient } from '../generated/prisma/client.js';

const prisma = new PrismaClient();
const storeRouter = express.Router();

storeRouter.post('/purchase', async (req, res) => {
    try {
        const { userId, seatReservationIds, pricePerSeat } = req.body;

        if (!userId || !seatReservationIds || !seatReservationIds.length) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const seats = await prisma.seatReservation.findMany({
            where: { id: { in: seatReservationIds } },
        });

        const alreadyReserved = seats.filter(s => s.isReserved);
        if (alreadyReserved.length) {
            return res.status(400).json({ message: 'Some seats are already reserved', seats: alreadyReserved });
        }

        const totalPrice = pricePerSeat * seatReservationIds.length;

        const receipt = await prisma.receipt.create({
            data: {
                userId,
                totalPrice,
                paymentMethod: 'card',
                paidAt: new Date()
            }
        });

        await prisma.seatReservation.updateMany({
            where: { id: { in: seatReservationIds } },
            data: { isReserved: true, userId }
        });

        const ticketsData = seatReservationIds.map(seatId => ({
            userId,
            seatReservationId: seatId,
            price: pricePerSeat,
            receiptId: receipt.id
        }));

        const tickets = await prisma.ticket.createMany({ data: ticketsData });

        res.status(201).json({ message: 'Tickets purchased successfully', receipt, ticketsCreated: tickets.count });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to purchase tickets' });
    }
});

storeRouter.get('/purchases/:id', async (req, res) => {
    const tickets = await prisma.ticket.findMany({
        where: { userId: Number(req.params.id) },
        include: {
            seatReservation: {
                include: {
                    schedule: {
                        include: { movie: true, theater: true }
                    },
                    seat: true
                }
            },
            receipt: true
        }
    });

    res.json(tickets);
})

export default storeRouter;