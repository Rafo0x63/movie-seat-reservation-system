import { Router } from "express";
import { PrismaClient } from '../generated/prisma/client.js';
import {isAdmin} from "../middleware/isAdmin.middleware.js";
import {authenticateToken} from "../middleware/auth.middleware.js";

const scheduleRouter = Router();
const prisma = new PrismaClient();

scheduleRouter.get("/", async (req, res) => {
    const schedules = await prisma.schedule.findMany();
    res.json(schedules);
});
scheduleRouter.get("/:id", async (req, res) => {
    const schedule = await prisma.schedule.findUnique({
        where: {
            id: Number(req.params.id)
        },
        include: {
            movie: true,
            seatReservations: true,
        }
    });
    res.json(schedule);
});
scheduleRouter.post("/:scheduleId/lock-seat", async (req, res) => {
    const scheduleId = +req.params.scheduleId;
    const { seatId, userId } = req.body;

    const seat = await prisma.seatReservation.findFirst({
        where: {
            seatId: seatId,
            scheduleId: scheduleId,
        },
    })

    const now = new Date();

    const isLocked = seat.isReserved || seat.lockedAt;

    if (isLocked) {
        return res.status(400).json({ message: 'Seat already reserved or locked' });
    }

    await prisma.seatReservation.updateMany({
        where: {
            seatId: seatId,
            scheduleId: scheduleId,
        },
        data: {
            lockedAt: now,
            userId: userId,
        }
    });

    res.json({ message: 'Seat locked successfully' });
});
scheduleRouter.post("/:scheduleId/unlock-seat", async (req, res) => {
    const { scheduleId } = req.params;
    const { userId, seatId } = req.body;

    try {
        const seatReservation = await prisma.seatReservation.findFirst({
            where: {
                seatId: Number(seatId),
                scheduleId: Number(scheduleId),
            },
        });

        if (!seatReservation) {
            return res.status(404).json({ message: "Seat reservation not found." });
        }

        if (seatReservation.userId !== userId) {
            return res.status(403).json({ message: "You cannot unlock this seat." });
        }

        const updated = await prisma.seatReservation.update({
            where: {
                id: seatReservation.id,
                seatId: Number(seatId),
                scheduleId: Number(scheduleId)
            },
            data: {
                userId: null,
                lockedAt: null,
            },
        });

        res.json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to unlock seat" });
    }
});
scheduleRouter.post('/', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { movieId, theaterId, startTime } = req.body;
        if (!movieId || !theaterId || !startTime) {
            return res.status(400).json({ message: 'Missing fields' });
        }

        const schedule = await prisma.schedule.create({
            data: {
                movieId: Number(movieId),
                theaterId: Number(theaterId),
                startTime: new Date(startTime),
            }
        });

        const seats = await prisma.seat.findMany({ where: { theaterId: Number(theaterId) } });

        const seatReservations = seats.map(seat => ({
            scheduleId: schedule.id,
            seatId: seat.id,
            isReserved: false,
            lockedAt: null,
            userId: null
        }));

        await prisma.seatReservation.createMany({ data: seatReservations });

        res.status(201).json({ schedule, seatReservationsCreated: seatReservations.length });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create schedule' });
    }
});

export default scheduleRouter;
