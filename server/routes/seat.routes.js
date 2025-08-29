import { Router } from "express";
import { PrismaClient } from '../generated/prisma/client.js';

const seatRouter = Router();
const prisma = new PrismaClient();

seatRouter.get("/", async (req, res) => {
    const seats = await prisma.seat.findMany();
    res.json(seats);
});
seatRouter.get("/theater/:id", async (req, res) => {
    const seats = await prisma.seat.findMany({
        where: {
            theaterId: Number(req.params.id)
        }
    });
    res.json(seats);
});
seatRouter.post("/", (req, res) => {
    res.send("CREATE new theater");
});
seatRouter.put("/:id", (req, res) => {
    res.send("UPDATE theater by id");
});
seatRouter.delete("/:id", (req, res) => {
    res.send("DELETE theater by id");
});

export default seatRouter;
