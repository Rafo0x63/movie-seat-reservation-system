import { Router } from "express";
import { PrismaClient } from '../generated/prisma/client.js';

const theaterRouter = Router();
const prisma = new PrismaClient();

theaterRouter.get("/", async (req, res) => {
    const theaters = await prisma.theater.findMany({
        include: { schedules: true }
    });
    res.json(theaters);
});

theaterRouter.get("/:slug", async (req, res) => {
    const slug = req.params.slug;

    const theater = await prisma.theater.findUnique({
        where: { slug },
        include: { schedules: {
            include: { movie: true }
            }
        }
    })

    res.json(theater);
});

theaterRouter.get("/:id", (req, res) => {
    res.send("GET theater by id");
});
theaterRouter.post('/', async (req, res) => {
    try {
        const { name, address, slug, rows, seatsPerRow } = req.body;

        if (!name || !address || !slug || !rows || !seatsPerRow) {
            return res.status(400).json({ message: 'Missing fields' });
        }

        const theater = await prisma.theater.create({
            data: { name, address, slug }
        });

        const seatData = [];
        for (let r = 0; r < rows; r++) {
            const rowLetter = String.fromCharCode(65 + r);
            for (let s = 1; s <= seatsPerRow; s++) {
                seatData.push({ theaterId: theater.id, rowLetter, seatNumber: s });
            }
        }

        await prisma.seat.createMany({ data: seatData });

        res.status(201).json({ theater, seatsCreated: seatData.length });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create theater' });
    }
});
theaterRouter.put("/:id", (req, res) => {
    res.send("UPDATE theater by id");
});
theaterRouter.delete("/:id", (req, res) => {
    res.send("DELETE theater by id");
});

export default theaterRouter;
